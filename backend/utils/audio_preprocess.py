import librosa
import os
import numpy as np

def preprocess_audio(file_path):
    """
    Analyzes audio file properties using Librosa and extracts advanced features
    for deepfake analysis.
    """
    if not os.path.exists(file_path):
        return {"error": "File not found"}

    try:
        # Load audio (only first 30 seconds to be fast)
        y, sr = librosa.load(file_path, sr=None, duration=30)
        duration = librosa.get_duration(y=y, sr=sr)
        
        # --- Feature Extraction ---
        # 1. MFCCs (Mel-frequency cepstral coefficients) - Texture of sound
        mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
        mfcc_mean = np.mean(mfccs, axis=1).tolist()
        mfcc_var = np.var(mfccs, axis=1).tolist()
        
        # 2. Spectral Centroid - "Brightness" of sound
        cent = librosa.feature.spectral_centroid(y=y, sr=sr)
        cent_mean = float(np.mean(cent))
        cent_var = float(np.var(cent))
        
        # 3. Spectral Rolloff - High frequency content
        rolloff = librosa.feature.spectral_rolloff(y=y, sr=sr)
        rolloff_mean = float(np.mean(rolloff))
        
        # 4. Zero Crossing Rate - Noisiness/percussiveness
        zcr = librosa.feature.zero_crossing_rate(y)
        zcr_mean = float(np.mean(zcr))
        
        # 5. Chroma - Pitch classes
        chroma = librosa.feature.chroma_stft(y=y, sr=sr)
        chroma_mean = np.mean(chroma, axis=1).tolist()
        chroma_var = np.var(chroma, axis=1).tolist()

        # 6. Silence/Noise Ratio (Heuristic)
        # Check percentage of samples near absolute zero (digital silence)
        # Real recordings rarely have absolute digital zeros unless edited.
        zero_samples = np.sum(np.abs(y) < 0.0001)
        silence_ratio = float(zero_samples / len(y))
        
        return {
            "duration": float(duration),
            "sample_rate": int(sr),
            "channels": 1 if len(y.shape) == 1 else y.shape[0],
            "path": file_path,
            "features": {
                "mfcc_mean": mfcc_mean,
                "mfcc_var": mfcc_var,
                "spectral_centroid_mean": cent_mean,
                "spectral_centroid_var": cent_var,
                "spectral_rolloff_mean": rolloff_mean,
                "zcr_mean": zcr_mean,
                "chroma_mean": chroma_mean,
                "chroma_var": chroma_var,
                "silence_ratio": silence_ratio
            }
        }
    except Exception as e:
        print(f"Error preprocessing audio: {e}")
        return {"error": str(e), "path": file_path}
