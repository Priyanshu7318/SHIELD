import cv2
import os

def preprocess_video(file_path):
    """
    Analyzes video metadata and extracts a middle frame for analysis.
    """
    if not os.path.exists(file_path):
        return {"error": "File not found"}

    try:
        cap = cv2.VideoCapture(file_path)
        if not cap.isOpened():
            return {"error": "Could not open video file"}

        frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        fps = cap.get(cv2.CAP_PROP_FPS)

        # Extract middle frame
        middle_frame_idx = frame_count // 2
        cap.set(cv2.CAP_PROP_POS_FRAMES, middle_frame_idx)
        ret, frame = cap.read()
        
        frame_path = None
        if ret:
            # Save frame to the same directory as the video
            base_dir = os.path.dirname(file_path)
            base_name = os.path.splitext(os.path.basename(file_path))[0]
            frame_filename = f"{base_name}_frame.jpg"
            frame_path = os.path.join(base_dir, frame_filename)
            cv2.imwrite(frame_path, frame)

        cap.release()

        return {
            "frames": frame_count,
            "resolution": f"{width}x{height}",
            "fps": fps,
            "path": file_path,
            "extracted_frame": frame_path
        }
    except Exception as e:
        print(f"Error preprocessing video: {e}")
        return {"error": str(e), "path": file_path}
