import numpy as np

class AudioForensicModel:
    """
    A heuristic-based forensic model for detecting AI-generated audio.
    This model analyzes statistical anomalies in audio features that are common in deepfakes.
    
    Disclaimer: This is a heuristic model and not a trained neural network. 
    It detects patterns often found in synthetic speech (e.g., lack of natural breathing,
    unnatural spectral consistency, or specific high-frequency artifacts).
    """
    
    def analyze(self, features):
        """
        Analyzes extracted audio features to determine if audio is real or fake.
        
        Args:
            features (dict): Dictionary containing features like MFCCs, spectral centroid, etc.
            
        Returns:
            dict: {"result": "Fake" or "Real", "confidence": float, "reason": str}
        """
        if not features:
            return {"result": "Unknown", "confidence": 0.0, "reason": "No features extracted"}
            
        score = 0
        reasons = []
        
        # --- Heuristic 1: Spectral Centroid Variance (Naturalness) ---
        # Real speech usually has high variance in brightness (vowels vs consonants).
        # Synthetic speech can sometimes be too consistent or have weird artifacts.
        cent_var = features.get("spectral_centroid_var", 0)
        # Thresholds are approximate based on general speech properties
        if cent_var < 50000: # Very low variance might indicate robotic/synthetic nature
            score += 20
            reasons.append("Unnaturally consistent spectral brightness")
        elif cent_var > 5000000: # Extremely high variance might indicate artifacts
            score += 10
            reasons.append("Anomalous spectral variance")
            
        # --- Heuristic 2: Zero Crossing Rate (ZCR) ---
        # ZCR correlates with noisiness/fricatives.
        zcr_mean = features.get("zcr_mean", 0)
        if zcr_mean < 0.015: # Too clean/smooth (lowered threshold slightly)
            score += 25
            reasons.append("Audio signal is unnaturally smooth (low ZCR)")
        
        # --- Heuristic 3: MFCC Variance (Texture) ---
        # Check variance of the first MFCC coefficient (energy)
        mfcc_vars = features.get("mfcc_var", [])
        if mfcc_vars and len(mfcc_vars) > 0:
            if mfcc_vars[0] < 100: # Low energy variance
                score += 15
                reasons.append("Low energy dynamics")

        # --- Heuristic 4: High Frequency Rolloff ---
        # Some older TTS models cut off high frequencies unnaturally.
        rolloff_mean = features.get("spectral_rolloff_mean", 0)
        if rolloff_mean < 3000: # Very low frequency cutoff
            score += 30
            reasons.append("Missing high-frequency details (common in older TTS)")
            
        # --- Heuristic 5: Silence Ratio (Digital Silence) ---
        silence_ratio = features.get("silence_ratio", 0)
        if silence_ratio > 0.3: # Too much absolute silence
             score += 20
             reasons.append("Unnatural digital silence detected")

        # --- Heuristic 6: Chroma Variance (Pitch Robotics) ---
        chroma_vars = features.get("chroma_var", [])
        if chroma_vars:
            avg_chroma_var = sum(chroma_vars) / len(chroma_vars)
            if avg_chroma_var < 0.005: # Very monotone
                score += 25
                reasons.append("Robotic/Monotone pitch detected")

        # --- Final Decision ---
        # Base probability is low, adds up with anomalies.
        # Normalize score to 0-100 probability
        
        # Add a baseline "uncertainty"
        probability = min(max(score, 10), 95) / 100.0
        
        if probability > 0.6:
            final_result = "Fake (High Probability)"
            main_reason = reasons[0] if reasons else "Multiple statistical anomalies detected"
        elif probability > 0.4:
            final_result = "Suspicious"
            main_reason = "Some unnatural characteristics detected"
        else:
            final_result = "Real (Likely Authentic)"
            main_reason = "Natural signal characteristics"
            probability = 1.0 - probability # Confidence in it being Real
            
        return {
            "result": final_result,
            "confidence": round(probability, 2),
            "reason": main_reason,
            "details": reasons
        }

# Singleton instance
audio_model = AudioForensicModel()
