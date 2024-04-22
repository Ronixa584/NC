# # https://www.youtube.com/watch?v=uR14UROzm-c
# # https://www.youtube.com/watch?v=t-ZggDz_GUo
# # Internet Speed is necessary


# import time
# from flask_cors import CORS
# import io
# import speech_recognition as sr
# from flask import Flask, request, jsonify
# import requests
# from pytube import YouTube
# from pydub import AudioSegment
# # from pydub import AudioSegment
# AudioSegment.converter = "C:\\Aniket\\ffmpeg\\bin\\ffmpeg.exe"
# AudioSegment.ffmpeg = "C:\\Aniket\\ffmpeg\\bin\\ffplay.exe"
# AudioSegment.ffprobe = "C:\\Aniket\\ffmpeg\\bin\\ffprobe.exe"



# app = Flask(__name__)
# CORS(app)

# CORS(app, resources={r"/VideoTranscription": {"origins": "http://localhost:5174"}})


# @app.route('/')
# def index():
#     return "Hello, World!"


# @app.route('/VideoTranscription', methods=['POST'])
# def transcribe():
#     print("Welcome")
#     try:
#         # print("Wk")
#         data = request.json
#         video_url = data.get('videoUrl')

#         if not video_url:
#             return jsonify({"error": "Missing videoUrl parameter"}), 400

#         print("Received POST request to /VideoTranscription 1")

#         yt = YouTube(video_url)
#         stream = yt.streams.filter(only_audio=True).first()
#         stream.download(output_path='Downloads', filename="video.mp4")
#         audio_stream_url = stream.url

#         print("Received POST request to /VideoTranscription 2")

#         response = requests.get(audio_stream_url)

#         print("Received POST request to /VideoTranscription 2")

#         # audio = AudioSegment.from_file(io.BytesIO(response.content), format="mp4")
#         audio = AudioSegment.from_file("Downloads/video.mp4")

#         audio.export("Downloads/audio.wav", format="wav")

#         recognizer = sr.Recognizer()

#         print("Received POST request to /VideoTranscription 3")

#         # time.sleep(15)
#         with sr.AudioFile("downloads/audio.wav") as source:
#             audio = recognizer.record(source)

#         print("Received POST request to /VideoTranscription 4")

#         try:
#             transcription = recognizer.recognize_google(audio)
#             return jsonify({"transcription": transcription})
#         except sr.UnknownValueError:
#             return jsonify({"error": "Google Web Speech API could not understand the audio"})
#         except sr.RequestError as e:
#             return jsonify({"error": f"Could not request results from Google Web Speech API {e}"}), 500
#     except Exception as e:
#         print("Received POST request to /VideoTranscription Error in SERVER")
#         return jsonify({"error": f"An error occurred: {e}"}), 500


# if __name__ == '__main__':
#     app.run(debug=True)





# import time
# from flask_cors import CORS
# import io
# import speech_recognition as sr
# from flask import Flask, request, jsonify
# import requests
# from pytube import YouTube
# from pydub import AudioSegment

# AudioSegment.converter = "C:\\Aniket\\ffmpeg\\bin\\ffmpeg.exe"
# AudioSegment.ffmpeg = "C:\\Aniket\\ffmpeg\\bin\\ffplay.exe"
# AudioSegment.ffprobe = "C:\\Aniket\\ffmpeg\\bin\\ffprobe.exe"

# app = Flask(__name__)
# CORS(app)

# CORS(app, resources={r"/VideoTranscription": {"origins": "http://localhost:5174"}})

# @app.route('/')
# def index():
#     return "Hello, World!"

# @app.route('/VideoTranscription', methods=['POST'])
# def transcribe():
#     print("Welcome")
#     try:
#         data = request.json
#         video_url = data.get('videoUrl')

#         if not video_url:
#             return jsonify({"error": "Missing videoUrl parameter"}), 400

#         print("Received POST request to /VideoTranscription 1")

#         yt = YouTube(video_url)
#         stream = yt.streams.filter(only_audio=True).first()
#         stream.download(output_path='Downloads', filename="video.mp4")
#         audio_stream_url = stream.url

#         print("Received POST request to /VideoTranscription 2")

#         response = requests.get(audio_stream_url)

#         print("Received POST request to /VideoTranscription 2")

#         audio = AudioSegment.from_file("Downloads/video.mp4")

#         audio.export("Downloads/audio.wav", format="wav")

#         recognizer = sr.Recognizer()

#         print("Received POST request to /VideoTranscription 3")

#         chunks = []
#         with sr.AudioFile("Downloads/audio.wav") as source:
#             audio = recognizer.record(source)
#             chunk_size = 10 * 1000  # Split audio into 10-second chunks
#             for chunk_start in range(0, len(audio), chunk_size):
#                 chunk_end = min(chunk_start + chunk_size, len(audio))
#                 chunk = audio[chunk_start:chunk_end]
#                 chunks.append(chunk)

#         print("Received POST request to /VideoTranscription 4")

#         transcriptions = []
#         for chunk in chunks:
#             try:
#                 transcription = recognizer.recognize_google(chunk)
#                 transcriptions.append(transcription)
#             except sr.UnknownValueError:
#                 pass  # Ignore unrecognized chunks
#             except sr.RequestError as e:
#                 return jsonify({"error": f"Could not request results from Google Web Speech API {e}"}), 500

#         combined_transcription = ' '.join(transcriptions)
#         return jsonify({"transcription": combined_transcription})

#     except Exception as e:
#         print("Received POST request to /VideoTranscription Error in SERVER")
#         return jsonify({"error": f"An error occurred: {e}"}), 500

# if __name__ == '__main__':
#     app.run(debug=True)





































# //Satyam

# https://www.youtube.com/watch?v=uR14UROzm-c
# https://www.youtube.com/watch?v=t-ZggDz_GUo
# Internet Speed is necessary


import time
from flask_cors import CORS
import io
import speech_recognition as sr
from flask import Flask, request, jsonify
import requests
from pytube import YouTube
from pydub import AudioSegment
# from pydub import AudioSegment
AudioSegment.converter = "C:\\Aniket\\ffmpeg\\bin\\ffmpeg.exe"
AudioSegment.ffmpeg = "C:\\Aniket\\ffmpeg\\bin\\ffplay.exe"
AudioSegment.ffprobe = "C:\\Aniket\\ffmpeg\\bin\\ffprobe.exe"

# satyam
import requests
import sys
API_KEY_ASSEMBLYAI = "933842205118487788dc8ac01ce16234"

app = Flask(__name__)
CORS(app)

CORS(app, resources={r"/VideoTranscription": {"origins": "https://notecraftnc.vercel.app/"}})


@app.route('/')
def index():
    return "Hello, World!"


@app.route('/VideoTranscription', methods=['POST'])
def transcribe():
    print("Welcome")
    try:
        # print("Wk")
        data = request.json
        video_url = data.get('videoUrl')

        if not video_url:
            return jsonify({"error": "Missing videoUrl parameter"}), 400

        print("Received POST request to /VideoTranscription 1")

        yt = YouTube(video_url)
        stream = yt.streams.filter(only_audio=True).first()
        stream.download(output_path='Downloads', filename="video.mp4")
        audio_stream_url = stream.url

        print("Received POST request to /VideoTranscription 2")

        response = requests.get(audio_stream_url)

        print("Received POST request to /VideoTranscription 2")

        # audio = AudioSegment.from_file(io.BytesIO(response.content), format="mp4")
        audio = AudioSegment.from_file("Downloads/video.mp4")

        audio.export("Downloads/audio.wav", format="wav")

        recognizer = sr.Recognizer()

        print("Received POST request to /VideoTranscription 3")

        # time.sleep(15)
        # with sr.AudioFile("downloads/audio.wav") as source:
        #     audio = recognizer.record(source)

        # print("Received POST request to /VideoTranscription 4")

        # try:
        #     transcription = recognizer.recognize_google(audio)
        #     return jsonify({"transcription": transcription})
        # except sr.UnknownValueError:
        #     return jsonify({"error": "Google Web Speech API could not understand the audio"})
        # except sr.RequestError as e:
        #     return jsonify({"error": f"Could not request results from Google Web Speech API {e}"}), 500

        # satyam
        upload_endpoint = 'https://api.assemblyai.com/v2/upload'
        transcript_endpoint = 'https://api.assemblyai.com/v2/transcript'

        headers_auth_only = {'authorization': API_KEY_ASSEMBLYAI}

        headers = {
            "authorization": API_KEY_ASSEMBLYAI,
            "content-type": "application/json"
        }

        CHUNK_SIZE = 5_242_880  # 5MB
        # filename = sys.argv[1]
        filename = 'Downloads/audio.wav'
        

        def upload(filename):
            def read_file(filename):
                with open(filename, 'rb') as f:
                    while True:
                        data = f.read(CHUNK_SIZE)
                        if not data:
                            break
                        yield data

            upload_response = requests.post(upload_endpoint, headers=headers_auth_only, data=read_file(filename))
            return upload_response.json()['upload_url']


        def transcribe(audio_url):
            transcript_request = {
                'audio_url': audio_url
            }
            transcript_response = requests.post(transcript_endpoint, json=transcript_request, headers=headers)
            return transcript_response.json()['id']

        # poll
        def poll(transcript_id):
            polling_endpoint = transcript_endpoint + '/' + transcript_id
            polling_response = requests.get(polling_endpoint, headers=headers)
            return polling_response.json()

        def get_transcription_result_url(audio_url):
            transcript_id = transcribe(audio_url)
            while(True):
                data = poll(transcript_id)
                if data['status'] == 'completed':
                    return data,None
                elif data['status'] == 'error':
                    return data,data['error']

        audio_url = upload(filename)
        data,error = get_transcription_result_url(audio_url)

        if data:
            print(data['text'])
            return jsonify({"transcription": data['text']})
        elif error:
            print("Error!!!", error)

    # satej
    except Exception as e:
        print("Received POST request to /VideoTranscription Error in SERVER")
        return jsonify({"error": f"An error occurred: {e}"}), 500


if __name__ == '__main__':
    app.run(debug=True)