/* global webkitSpeechRecognition */


// import React, { useState, useEffect, useRef } from 'react';
// import { Camera, Mic, Type, Upload, Volume2, VolumeX } from 'lucide-react';

// const MedWise = () => {
//   const [stage, setStage] = useState('language');
//   const [language, setLanguage] = useState('');
//   const [inputMode, setInputMode] = useState('');
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [audioEnabled, setAudioEnabled] = useState(true);
//   const [result, setResult] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [textInput, setTextInput] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [cameraActive, setCameraActive] = useState(false);
//   const [isListening, setIsListening] = useState(false);
//   const recognitionRef = useRef(null);
//   const languageLoopRef = useRef(null);

//   const texts = {
//     english: {
//       languagePrompt: "Press 1 for English, Press 2 for Kannada, Press 3 for Hindi",
//       welcome: "Welcome to MedWise. Please select an input method.",
//       options: "Press 1 for Image Upload, Press 2 to Type Medicine Name, Press 3 for Voice Input",
//       imageOption: "Image Upload",
//       typeOption: "Type Medicine Name",
//       voiceOption: "Voice Input",
//       processing: "Processing your medicine...",
//       result: "Medicine Information",
//       uploadOrCapture: "Upload or Capture Medicine Image",
//       upload: "Upload Image",
//       capture: "Capture Photo",
//       enterName: "Enter Medicine Name",
//       submit: "Submit",
//       startVoice: "Start Speaking",
//       stopVoice: "Stop Recording",
//       backToMenu: "Back to Menu",
//       changeLanguage: "Change Language",
//       noResult: "Medicine not found in database"
//     },
//     kannada: {
//       languagePrompt: "ಇಂಗ್ಲಿಷ್‌ಗೆ 1 ಒತ್ತಿ, ಕನ್ನಡಕ್ಕೆ 2 ಒತ್ತಿ, ಹಿಂದಿಗೆ 3 ಒತ್ತಿ",
//       welcome: "ಮೆಡ್ ವೈಸ್ ಗೆ ಸ್ವಾಗತ. ದಯವಿಟ್ಟು ಇನ್‌ಪುಟ್ ವಿಧಾನವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
//       options: "ಚಿತ್ರ ಅಪ್‌ಲೋಡ್‌ಗಾಗಿ 1 ಒತ್ತಿ, ಔಷಧದ ಹೆಸರು ಟೈಪ್ ಮಾಡಲು 2 ಒತ್ತಿ, ಧ್ವನಿ ಇನ್‌ಪುಟ್‌ಗಾಗಿ 3 ಒತ್ತಿ",
//       imageOption: "ಚಿತ್ರ ಅಪ್‌ಲೋಡ್",
//       typeOption: "ಔಷಧದ ಹೆಸರು ಟೈಪ್ ಮಾಡಿ",
//       voiceOption: "ಧ್ವನಿ ಇನ್‌ಪುಟ್",
//       processing: "ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತಿದೆ...",
//       result: "ಔಷಧ ಮಾಹಿತಿ",
//       uploadOrCapture: "ಔಷಧದ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಸೆರೆಹಿಡಿಯಿರಿ",
//       upload: "ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
//       capture: "ಫೋಟೋ ತೆಗೆಯಿರಿ",
//       enterName: "ಔಷಧದ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
//       submit: "ಸಲ್ಲಿಸು",
//       startVoice: "ಮಾತನಾಡಲು ಪ್ರಾರಂಭಿಸಿ",
//       stopVoice: "ರೆಕಾರ್ಡಿಂಗ್ ನಿಲ್ಲಿಸಿ",
//       backToMenu: "ಮೆನುಗೆ ಹಿಂತಿರುಗಿ",
//       changeLanguage: "ಭಾಷೆ ಬದಲಿಸಿ",
//       noResult: "ಔಷಧ ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ಕಂಡುಬಂದಿಲ್ಲ"
//     },
//     hindi: {
//       languagePrompt: "अंग्रेजी के लिए 1 दबाएं, कन्नड़ के लिए 2 दबाएं, हिंदी के लिए 3 दबाएं",
//       welcome: "मेडवाइज में आपका स्वागत है। कृपया इनपुट विधि चुनें।",
//       options: "छवि अपलोड के लिए 1 दबाएं, दवा का नाम टाइप करने के लिए 2 दबाएं, वॉयस इनपुट के लिए 3 दबाएं",
//       imageOption: "छवि अपलोड करें",
//       typeOption: "दवा का नाम टाइप करें",
//       voiceOption: "वॉयस इनपुट",
//       processing: "प्रसंस्करण...",
//       result: "दवा की जानकारी",
//       uploadOrCapture: "दवा की छवि अपलोड या कैप्चर करें",
//       upload: "छवि अपलोड करें",
//       capture: "फोटो लें",
//       enterName: "दवा का नाम दर्ज करें",
//       submit: "जमा करें",
//       startVoice: "बोलना शुरू करें",
//       stopVoice: "रिकॉर्डिंग बंद करें",
//       backToMenu: "मेनू पर वापस जाएं",
//       changeLanguage: "भाषा बदलें",
//       noResult: "दवा डेटाबेस में नहीं मिली"
//     }
//   };

//   const languageCodes = {
//     english: 'en-US',
//     kannada: 'kn-IN',
//     hindi: 'hi-IN'
//   };

//   // Medicine database from your trained model
//   const MEDICINE_DATABASE = {
//     'cetrizine': { 
//       name: 'Cetrizine (Cetirizine)', 
//       uses: 'Antihistamine for allergy relief', 
//       dosage: '5-10mg once daily', 
//       warnings: 'May cause drowsiness' 
//     },
//     'emeset-4': { 
//       name: 'Emeset-4 (Ondansetron)', 
//       uses: 'Prevents nausea and vomiting', 
//       dosage: '4-8mg as directed', 
//       warnings: 'Take as prescribed by doctor' 
//     },
//     'paracetamol': { 
//       name: 'Paracetamol', 
//       uses: 'Pain relief and fever reduction', 
//       dosage: '500-1000mg every 4-6 hours', 
//       warnings: 'Do not exceed 4000mg/day' 
//     }
//   };

//   const speak = (text, lang) => {
//     if (!audioEnabled || !('speechSynthesis' in window)) return;

//     window.speechSynthesis.cancel();

//     return new Promise((resolve) => {
//       const utterance = new SpeechSynthesisUtterance(text);

//       // Set language with better voice selection
//       const langCode = languageCodes[lang] || 'en-US';
//       utterance.lang = langCode;
//       utterance.rate = 0.85;
//       utterance.pitch = 1;
//       utterance.volume = 1;

//       // Wait for voices to load
//       const setVoice = () => {
//         const voices = window.speechSynthesis.getVoices();

//         // Try to find a voice for the language
//         let voice = voices.find(v => v.lang.startsWith(langCode.split('-')[0]));

//         // Fallback: for Kannada and Hindi, use any available Indian voice or English
//         if (!voice && (lang === 'kannada' || lang === 'hindi')) {
//           voice = voices.find(v => v.lang.includes('IN')) || 
//                   voices.find(v => v.lang.includes('en-IN')) ||
//                   voices.find(v => v.lang.includes('en-US'));
//         }

//         if (voice) {
//           utterance.voice = voice;
//         }
//       };

//       // Load voices if not loaded
//       if (window.speechSynthesis.getVoices().length === 0) {
//         window.speechSynthesis.onvoiceschanged = () => {
//           setVoice();
//         };
//       } else {
//         setVoice();
//       }

//       utterance.onstart = () => setIsSpeaking(true);
//       utterance.onend = () => {
//         setIsSpeaking(false);
//         resolve();
//       };
//       utterance.onerror = (e) => {
//         console.error('Speech error:', e);
//         setIsSpeaking(false);
//         resolve();
//       };

//       // Small delay to ensure voice is set
//       setTimeout(() => {
//         window.speechSynthesis.speak(utterance);
//       }, 100);
//     });
//   };

//   const stopSpeaking = () => {
//     window.speechSynthesis.cancel();
//     setIsSpeaking(false);
//   };

//   const playLanguageLoop = () => {
//     const languages = ['english', 'kannada', 'hindi'];
//     let index = 0;

//     const playNext = () => {
//       if (stage !== 'language') return;

//       const lang = languages[index];
//       speak(texts[lang].languagePrompt, lang);

//       index = (index + 1) % 3;
//       languageLoopRef.current = setTimeout(playNext, 5000);
//     };

//     playNext();
//   };

//   useEffect(() => {
//     if (stage === 'language') {
//       playLanguageLoop();
//     }

//     return () => {
//       if (languageLoopRef.current) {
//         clearTimeout(languageLoopRef.current);
//       }
//       stopSpeaking();
//     };
//   }, [stage, audioEnabled]);

//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (stage === 'language') {
//         if (e.key === '1') {
//           stopSpeaking();
//           if (languageLoopRef.current) clearTimeout(languageLoopRef.current);
//           setLanguage('english');
//           setStage('menu');
//           setTimeout(() => speak(texts.english.welcome + " " + texts.english.options, 'english'), 100);
//         } else if (e.key === '2') {
//           stopSpeaking();
//           if (languageLoopRef.current) clearTimeout(languageLoopRef.current);
//           setLanguage('kannada');
//           setStage('menu');
//           setTimeout(() => speak(texts.kannada.welcome + " " + texts.kannada.options, 'kannada'), 100);
//         } else if (e.key === '3') {
//           stopSpeaking();
//           if (languageLoopRef.current) clearTimeout(languageLoopRef.current);
//           setLanguage('hindi');
//           setStage('menu');
//           setTimeout(() => speak(texts.hindi.welcome + " " + texts.hindi.options, 'hindi'), 100);
//         }
//       } else if (stage === 'menu') {
//         if (e.key === '1') {
//           setInputMode('image');
//           setStage('input');
//         } else if (e.key === '2') {
//           setInputMode('type');
//           setStage('input');
//         } else if (e.key === '3') {
//           setInputMode('voice');
//           setStage('input');
//           startVoiceRecognition();
//         }
//       }
//     };

//     window.addEventListener('keydown', handleKeyPress);
//     return () => window.removeEventListener('keydown', handleKeyPress);
//   }, [stage, language]);

//   const preprocessImage = (imageData) => {
//     return new Promise((resolve) => {
//       const img = new Image();
//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         canvas.width = 224;
//         canvas.height = 224;
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(img, 0, 0, 224, 224);
//         resolve(canvas.toDataURL('image/jpeg'));
//       };
//       img.src = imageData;
//     });
//   };

//   const predictMedicine = async (imageData) => {
//     try {
//       // Preprocess image
//       const processedImage = await preprocessImage(imageData);

//       // Local API endpoint
//       // const API_URL = ' http://localhost:5000';
//       const API_URL = 'https://medwise-kf10.onrender.com/';

//       const formData = new FormData();
//       const blob = await fetch(processedImage).then(r => r.blob());
//       formData.append('image', blob, 'medicine.jpg');

//       const response = await fetch(`${API_URL}/predict`, {
//         method: 'POST',
//         body: formData
//       });

//       if (!response.ok) {
//         throw new Error('API call failed');
//       }

//       const data = await response.json();

//       // Expected response format: { success: true, medicine_info: {...} }
//       if (data.success && data.medicine_info) {
//         return data.medicine_info;
//       }

//       return null;
//     } catch (error) {
//       console.error('Prediction error:', error);
//       // Fallback to mock prediction for demo
//       return mockPrediction();
//     }
//   };

//   const mockPrediction = () => {
//     // For demo purposes - randomly select a medicine
//     const medicines = Object.keys(MEDICINE_DATABASE);
//     const randomMed = medicines[Math.floor(Math.random() * medicines.length)];
//     return MEDICINE_DATABASE[randomMed];
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         processImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ 
//         video: { facingMode: 'environment', width: 1280, height: 720 } 
//       });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         setCameraActive(true);
//       }
//     } catch (err) {
//       alert('Camera access denied');
//     }
//   };

//   const capturePhoto = () => {
//     if (videoRef.current && canvasRef.current) {
//       const canvas = canvasRef.current;
//       const video = videoRef.current;
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       const ctx = canvas.getContext('2d');
//       ctx.drawImage(video, 0, 0);
//       const imageData = canvas.toDataURL('image/jpeg');
//       setImagePreview(imageData);

//       const stream = video.srcObject;
//       stream.getTracks().forEach(track => track.stop());
//       setCameraActive(false);

//       processImage(imageData);
//     }
//   };

//   const processImage = async (imageData) => {
//     setIsProcessing(true);
//     speak(texts[language].processing, language);

//     try {
//       // Call your trained model
//       const medicineInfo = await predictMedicine(imageData);

//       if (medicineInfo) {
//         setResult(medicineInfo);
//         setStage('result');

//         const resultText = `Medicine identified: ${medicineInfo.name}. Used for ${medicineInfo.uses}. ${medicineInfo.dosage}`;
//         speak(resultText, language);
//       } else {
//         setResult({ name: texts[language].noResult, uses: '', dosage: '', warnings: '' });
//         setStage('result');
//         speak(texts[language].noResult, language);
//       }
//     } catch (error) {
//       console.error('Processing error:', error);
//       setResult({ name: 'Error processing image', uses: '', dosage: '', warnings: '' });
//       setStage('result');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const processText = async () => {
//     if (!textInput.trim()) return;

//     setIsProcessing(true);
//     speak(texts[language].processing, language);

//     const searchTerm = textInput.toLowerCase().trim();
//     const medicineInfo = MEDICINE_DATABASE[searchTerm];

//     setTimeout(() => {
//       if (medicineInfo) {
//         setResult(medicineInfo);
//         setStage('result');

//         const resultText = `Information for ${medicineInfo.name}: ${medicineInfo.uses}. ${medicineInfo.dosage}`;
//         speak(resultText, language);
//       } else {
//         setResult({ name: texts[language].noResult, uses: '', dosage: '', warnings: '' });
//         setStage('result');
//         speak(texts[language].noResult, language);
//       }
//       setIsProcessing(false);
//     }, 1000);
//   };

//   const startVoiceRecognition = () => {
//     if (!('webkitSpeechRecognition' in window)) {
//       alert('Voice recognition not supported');
//       return;
//     }

//     const recognition = new webkitSpeechRecognition();
//     recognition.continuous = false;
//     recognition.interimResults = false;
//     recognition.lang = languageCodes[language];

//     recognition.onstart = () => setIsListening(true);

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setTextInput(transcript);
//       setIsListening(false);

//       setTimeout(() => {
//         const searchTerm = transcript.toLowerCase().trim();
//         const medicineInfo = MEDICINE_DATABASE[searchTerm];

//         setIsProcessing(true);
//         speak(texts[language].processing, language);

//         setTimeout(() => {
//           if (medicineInfo) {
//             setResult(medicineInfo);
//             setStage('result');

//             const resultText = `You said ${transcript}. Medicine: ${medicineInfo.name}. ${medicineInfo.uses}`;
//             speak(resultText, language);
//           } else {
//             setResult({ name: texts[language].noResult, uses: '', dosage: '', warnings: '' });
//             setStage('result');
//             speak(texts[language].noResult, language);
//           }
//           setIsProcessing(false);
//         }, 1500);
//       }, 500);
//     };

//     recognition.onerror = () => {
//       setIsListening(false);
//       alert('Voice recognition error');
//     };

//     recognition.onend = () => setIsListening(false);

//     recognitionRef.current = recognition;
//     recognition.start();
//   };

//   const stopVoiceRecognition = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//     }
//   };

//   const resetApp = () => {
//     stopSpeaking();
//     setStage('menu');
//     setInputMode('');
//     setResult(null);
//     setImagePreview(null);
//     setTextInput('');
//     setCameraActive(false);
//     setTimeout(() => speak(texts[language].options, language), 100);
//   };

//   const changeLanguage = () => {
//     stopSpeaking();
//     setStage('language');
//     setLanguage('');
//     setInputMode('');
//     setResult(null);
//     setImagePreview(null);
//     setTextInput('');
//     setCameraActive(false);
//   };

//   const t = language ? texts[language] : texts.english;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//       <div className="max-w-2xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//           <div className="flex items-center justify-between">
//             <h1 className="text-3xl font-bold text-indigo-600">💊 Medwise- Know Your Medicine</h1>
//             <button
//               onClick={() => setAudioEnabled(!audioEnabled)}
//               className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition"
//             >
//               {audioEnabled ? <Volume2 className="w-6 h-6 text-indigo-600" /> : <VolumeX className="w-6 h-6 text-gray-400" />}
//             </button>
//           </div>
//         </div>

//         {/* Language Selection */}
//         {stage === 'language' && (
//           <div className="bg-white rounded-lg shadow-lg p-8">
//             <h2 className="text-2xl font-semibold text-center mb-6">Select Language / ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ / भाषा चुनें</h2>
//             <div className="space-y-4">
//               <button
//                 onClick={() => {
//                   stopSpeaking();
//                   if (languageLoopRef.current) clearTimeout(languageLoopRef.current);
//                   setLanguage('english');
//                   setStage('menu');
//                   setTimeout(() => speak(texts.english.welcome + " " + texts.english.options, 'english'), 100);
//                 }}
//                 className="w-full p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-lg font-semibold transition transform hover:scale-105"
//               >
//                 1 - English
//               </button>
//               <button
//                 onClick={() => {
//                   stopSpeaking();
//                   if (languageLoopRef.current) clearTimeout(languageLoopRef.current);
//                   setLanguage('kannada');
//                   setStage('menu');
//                   setTimeout(() => speak(texts.kannada.welcome + " " + texts.kannada.options, 'kannada'), 100);
//                 }}
//                 className="w-full p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-lg font-semibold transition transform hover:scale-105"
//               >
//                 2 - ಕನ್ನಡ (Kannada)
//               </button>
//               <button
//                 onClick={() => {
//                   stopSpeaking();
//                   if (languageLoopRef.current) clearTimeout(languageLoopRef.current);
//                   setLanguage('hindi');
//                   setStage('menu');
//                   setTimeout(() => speak(texts.hindi.welcome + " " + texts.hindi.options, 'hindi'), 100);
//                 }}
//                 className="w-full p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-lg font-semibold transition transform hover:scale-105"
//               >
//                 3 - हिंदी (Hindi)
//               </button>
//             </div>
//             {isSpeaking && (
//               <div className="mt-6 text-center">
//                 <div className="inline-block animate-pulse text-indigo-600 text-lg">
//                   🔊 Playing instructions...
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Menu */}
//         {stage === 'menu' && (
//           <div className="bg-white rounded-lg shadow-lg p-8">
//             <h2 className="text-2xl font-semibold text-center mb-6">{t.welcome}</h2>
//             <div className="space-y-4">
//               <button
//                 onClick={() => {
//                   setInputMode('image');
//                   setStage('input');
//                 }}
//                 className="w-full p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-3 text-lg font-semibold transition transform hover:scale-105"
//               >
//                 <Camera className="w-6 h-6" />
//                 1 - {t.imageOption}
//               </button>
//               <button
//                 onClick={() => {
//                   setInputMode('type');
//                   setStage('input');
//                 }}
//                 className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-3 text-lg font-semibold transition transform hover:scale-105"
//               >
//                 <Type className="w-6 h-6" />
//                 2 - {t.typeOption}
//               </button>
//               <button
//                 onClick={() => {
//                   setInputMode('voice');
//                   setStage('input');
//                   setTimeout(startVoiceRecognition, 500);
//                 }}
//                 className="w-full p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-3 text-lg font-semibold transition transform hover:scale-105"
//               >
//                 <Mic className="w-6 h-6" />
//                 3 - {t.voiceOption}
//               </button>
//             </div>
//             <button
//               onClick={changeLanguage}
//               className="w-full mt-6 p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
//             >
//               {t.changeLanguage}
//             </button>
//           </div>
//         )}

//         {/* Input Stage */}
//         {stage === 'input' && (
//           <div className="bg-white rounded-lg shadow-lg p-8">
//             {inputMode === 'image' && (
//               <div>
//                 <h2 className="text-2xl font-semibold mb-6">{t.uploadOrCapture}</h2>

//                 {!cameraActive && !imagePreview && (
//                   <div className="space-y-4">
//                     <label className="block">
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageUpload}
//                         className="hidden"
//                         id="imageUpload"
//                       />
//                       <div className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition">
//                         <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
//                         <span className="text-lg">{t.upload}</span>
//                       </div>
//                     </label>
//                     <button
//                       onClick={startCamera}
//                       className="w-full p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 transition"
//                     >
//                       <Camera className="w-6 h-6" />
//                       {t.capture}
//                     </button>
//                   </div>
//                 )}

//                 {cameraActive && (
//                   <div className="space-y-4">
//                     <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg shadow-md" />
//                     <button
//                       onClick={capturePhoto}
//                       className="w-full p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
//                     >
//                       📸 Capture Photo
//                     </button>
//                   </div>
//                 )}

//                 {imagePreview && (
//                   <div className="space-y-4">
//                     <img src={imagePreview} alt="Preview" className="w-full rounded-lg shadow-md" />
//                     {isProcessing && (
//                       <div className="text-center py-4">
//                         <div className="animate-spin w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto"></div>
//                         <p className="mt-4 text-lg">{t.processing}</p>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 <canvas ref={canvasRef} className="hidden" />
//               </div>
//             )}

//             {inputMode === 'type' && (
//               <div>
//                 <h2 className="text-2xl font-semibold mb-6">{t.typeOption}</h2>
//                 <input
//                   type="text"
//                   value={textInput}
//                   onChange={(e) => setTextInput(e.target.value)}
//                   placeholder={t.enterName}
//                   className="w-full p-4 border-2 border-gray-300 rounded-lg mb-4 text-lg focus:border-indigo-500 focus:outline-none"
//                   onKeyPress={(e) => e.key === 'Enter' && processText()}
//                 />
//                 <button
//                   onClick={processText}
//                   disabled={!textInput.trim() || isProcessing}
//                   className="w-full p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
//                 >
//                   {isProcessing ? t.processing : t.submit}
//                 </button>
//               </div>
//             )}

//             {inputMode === 'voice' && (
//               <div>
//                 <h2 className="text-2xl font-semibold mb-6">{t.voiceOption}</h2>
//                 <div className="text-center py-8">
//                   {isListening ? (
//                     <div>
//                       <div className="w-24 h-24 mx-auto mb-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
//                         <Mic className="w-12 h-12 text-white" />
//                       </div>
//                       <p className="text-xl mb-4">Listening...</p>
//                       <button
//                         onClick={stopVoiceRecognition}
//                         className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
//                       >
//                         {t.stopVoice}
//                       </button>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={startVoiceRecognition}
//                       className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-lg transition transform hover:scale-105"
//                     >
//                       <Mic className="w-6 h-6 inline mr-2" />
//                       {t.startVoice}
//                     </button>
//                   )}
//                   {textInput && (
//                     <div className="mt-6 p-4 bg-gray-100 rounded-lg">
//                       <p className="text-lg">"{textInput}"</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {!isProcessing && (
//               <button
//                 onClick={resetApp}
//                 className="w-full mt-6 p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
//               >
//                 {t.backToMenu}
//               </button>
//             )}
//           </div>
//         )}

//         {/* Result Stage */}
//         {stage === 'result' && result && (
//           <div className="bg-white rounded-lg shadow-lg p-8">
//             <h2 className="text-2xl font-bold text-indigo-600 mb-6">{t.result}</h2>
//             <div className="space-y-4">
//               <div className="border-b pb-3">
//                 <h3 className="font-semibold text-gray-600">Medicine Name:</h3>
//                 <p className="text-xl font-bold">{result.name}</p>
//               </div>
//               {result.uses && (
//                 <div className="border-b pb-3">
//                   <h3 className="font-semibold text-gray-600">Uses:</h3>
//                   <p>{result.uses}</p>
//                 </div>
//               )}
//               {result.dosage && (
//                 <div className="border-b pb-3">
//                   <h3 className="font-semibold text-gray-600">Dosage:</h3>
//                   <p>{result.dosage}</p>
//                 </div>
//               )}
//               {result.warnings && (
//                 <div className="pb-3">
//                   <h3 className="font-semibold text-gray-600">Warnings:</h3>
//                   <p className="text-red-600 font-semibold">{result.warnings}</p>
//                 </div>
//               )}
//             </div>
//             <div className="flex gap-3 mt-6">
//               <button
//                 onClick={resetApp}
//                 className="flex-1 p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
//               >
//                 {t.backToMenu}
//               </button>
//               <button
//                 onClick={changeLanguage}
//                 className="flex-1 p-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
//               >
//                 {t.changeLanguage}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MedWise



// import React, { useState, useEffect, useRef } from 'react';
// import { Camera, Mic, Type, Upload, Volume2, VolumeX } from 'lucide-react';
// import medicines from "../data/medicine.json";


// const MedWise = () => {
//   const [stage, setStage] = useState('language');
//   const [language, setLanguage] = useState('');
//   const [inputMode, setInputMode] = useState('');
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [audioEnabled, setAudioEnabled] = useState(true);
//   const [result, setResult] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [textInput, setTextInput] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [cameraActive, setCameraActive] = useState(false);
//   const [isListening, setIsListening] = useState(false);
//   const recognitionRef = useRef(null);
//   const languageLoopRef = useRef(null);

//   const texts = {
//     english: {
//       languagePrompt: "Press 1 for English, Press 2 for Kannada, Press 3 for Hindi",
//       welcome: "Welcome to MedWise. Please select an input method.",
//       options: "Press 1 for Image Upload, Press 2 to Type Medicine Name, Press 3 for Voice Input",
//       imageOption: "Image Upload",
//       typeOption: "Type Medicine Name",
//       voiceOption: "Voice Input",
//       processing: "Processing your medicine...",
//       result: "Medicine Information",
//       uploadOrCapture: "Upload or Capture Medicine Image",
//       upload: "Upload Image",
//       capture: "Capture Photo",
//       enterName: "Enter Medicine Name",
//       submit: "Submit",
//       startVoice: "Start Speaking",
//       stopVoice: "Stop Recording",
//       backToMenu: "Back to Menu",
//       changeLanguage: "Change Language",
//       noResult: "Medicine not found in database"
//     },
//     kannada: {
//       languagePrompt: "ಇಂಗ್ಲಿಷ್‌ಗೆ 1 ಒತ್ತಿ, ಕನ್ನಡಕ್ಕೆ 2 ಒತ್ತಿ, ಹಿಂದಿಗೆ 3 ಒತ್ತಿ",
//       welcome: "ಮೆಡ್ ವೈಸ್ ಗೆ ಸ್ವಾಗತ. ದಯವಿಟ್ಟು ಇನ್‌ಪುಟ್ ವಿಧಾನವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
//       options: "ಚಿತ್ರ ಅಪ್‌ಲೋಡ್‌ಗಾಗಿ 1 ಒತ್ತಿ, ಔಷಧದ ಹೆಸರು ಟೈಪ್ ಮಾಡಲು 2 ಒತ್ತಿ, ಧ್ವನಿ ಇನ್‌ಪುಟ್‌ಗಾಗಿ 3 ಒತ್ತಿ",
//       imageOption: "ಚಿತ್ರ ಅಪ್‌ಲೋಡ್",
//       typeOption: "ಔಷಧದ ಹೆಸರು ಟೈಪ್ ಮಾಡಿ",
//       voiceOption: "ಧ್ವನಿ ಇನ್‌ಪುಟ್",
//       processing: "ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತಿದೆ...",
//       result: "ಔಷಧ ಮಾಹಿತಿ",
//       uploadOrCapture: "ಔಷಧದ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಸೆರೆಹಿಡಿಯಿರಿ",
//       upload: "ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
//       capture: "ಫೋಟೋ ತೆಗೆಯಿರಿ",
//       enterName: "ಔಷಧದ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
//       submit: "ಸಲ್ಲಿಸು",
//       startVoice: "ಮಾತನಾಡಲು ಪ್ರಾರಂಭಿಸಿ",
//       stopVoice: "ರೆಕಾರ್ಡಿಂಗ್ ನಿಲ್ಲಿಸಿ",
//       backToMenu: "ಮೆನುಗೆ ಹಿಂತಿರುಗಿ",
//       changeLanguage: "ಭಾಷೆ ಬದಲಿಸಿ",
//       noResult: "ಔಷಧ ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ಕಂಡುಬಂದಿಲ್ಲ"
//     },
//     hindi: {
//       languagePrompt: "अंग्रेजी के लिए 1 दबाएं, कन्नड़ के लिए 2 दबाएं, हिंदी के लिए 3 दबाएं",
//       welcome: "मेडवाइज में आपका स्वागत है। कृपया इनपुट विधि चुनें।",
//       options: "छवि अपलोड के लिए 1 दबाएं, दवा का नाम टाइप करने के लिए 2 दबाएं, वॉयस इनपुट के लिए 3 दबाएं",
//       imageOption: "छवि अपलोड करें",
//       typeOption: "दवा का नाम टाइप करें",
//       voiceOption: "वॉयस इनपुट",
//       processing: "प्रसंस्करण...",
//       result: "दवा की जानकारी",
//       uploadOrCapture: "दवा की छवि अपलोड या कैप्चर करें",
//       upload: "छवि अपलोड करें",
//       capture: "फोटो लें",
//       enterName: "दवा का नाम दर्ज करें",
//       submit: "जमा करें",
//       startVoice: "बोलना शुरू करें",
//       stopVoice: "रिकॉर्डिंग बंद करें",
//       backToMenu: "मेनू पर वापस जाएं",
//       changeLanguage: "भाषा बदलें",
//       noResult: "दवा डेटाबेस में नहीं मिली"
//     }
//   };

//   const languageCodes = {
//     english: 'en-US',
//     kannada: 'kn-IN',
//     hindi: 'hi-IN'
//   };

//   const getLangKey = () => {
//   if (language === "english") return "en";
//   if (language === "kannada") return "kn";
//   return "hi";
// };


//   // Medicine database from your trained model
//   const MEDICINE_DATABASE = {
//     'cetrizine': { 
//       name: 'Cetrizine (Cetirizine)', 
//       uses: 'Antihistamine for allergy relief', 
//       dosage: '5-10mg once daily', 
//       warnings: 'May cause drowsiness' 
//     },
//     'emeset-4': { 
//       name: 'Emeset-4 (Ondansetron)', 
//       uses: 'Prevents nausea and vomiting', 
//       dosage: '4-8mg as directed', 
//       warnings: 'Take as prescribed by doctor' 
//     },
//     'paracetamol': { 
//       name: 'Paracetamol', 
//       uses: 'Pain relief and fever reduction', 
//       dosage: '500-1000mg every 4-6 hours', 
//       warnings: 'Do not exceed 4000mg/day' 
//     }
//   };

//   useEffect(() => {
//   // Force browser to load voices early
//   window.speechSynthesis.getVoices();

//   window.speechSynthesis.onvoiceschanged = () => {
//     window.speechSynthesis.getVoices();
//   };
// }, []);

//   // const speak = (text, lang) => {
//   //   if (!audioEnabled || !('speechSynthesis' in window)) return;

//   //   window.speechSynthesis.cancel();

//   //   return new Promise((resolve) => {
//   //     const utterance = new SpeechSynthesisUtterance(text);

//   //     // Set language with better voice selection
//   //     const langCode = languageCodes[lang] || 'en-US';
//   //     utterance.lang = langCode;
//   //     utterance.rate = 0.85;
//   //     utterance.pitch = 1;
//   //     utterance.volume = 1;

//   //     // Wait for voices to load
//   //     const setVoice = () => {
//   //       const voices = window.speechSynthesis.getVoices();

//   //       // Try to find a voice for the language
//   //       let voice = voices.find(v => v.lang.startsWith(langCode.split('-')[0]));

//   //       // Fallback: for Kannada and Hindi, use any available Indian voice or English
//   //       if (!voice && (lang === 'kannada' || lang === 'hindi')) {
//   //         voice = voices.find(v => v.lang.includes('IN')) || 
//   //                 voices.find(v => v.lang.includes('en-IN')) ||
//   //                 voices.find(v => v.lang.includes('en-US'));
//   //       }

//   //       if (voice) {
//   //         utterance.voice = voice;
//   //       }
//   //     };

//   //     // Load voices if not loaded
//   //     if (window.speechSynthesis.getVoices().length === 0) {
//   //       window.speechSynthesis.onvoiceschanged = () => {
//   //         setVoice();
//   //       };
//   //     } else {
//   //       setVoice();
//   //     }

//   //     utterance.onstart = () => setIsSpeaking(true);
//   //     utterance.onend = () => {
//   //       setIsSpeaking(false);
//   //       resolve();
//   //     };
//   //     utterance.onerror = (e) => {
//   //       console.error('Speech error:', e);
//   //       setIsSpeaking(false);
//   //       resolve();
//   //     };

//   //     // Small delay to ensure voice is set
//   //     setTimeout(() => {
//   //       window.speechSynthesis.speak(utterance);
//   //     }, 100);
//   //   });
//   // };
//   const speak = (text, lang) => {
//   if (!audioEnabled || !('speechSynthesis' in window) || !text) return;

//   return new Promise((resolve) => {
//     const utterance = new SpeechSynthesisUtterance(text);

//     const langCode = languageCodes[lang] || 'en-US';
//     utterance.lang = langCode;



//     // Slow & clear (medical friendly)
//     utterance.rate = 0.6;
//     utterance.pitch = 1.0;
//     utterance.volume = 1.0;

//     const voices = window.speechSynthesis.getVoices();

//     let voice =
//       voices.find(v => v.lang === langCode) ||
//       voices.find(v => v.lang.startsWith(langCode.split('-')[0])) ||
//       voices.find(v => v.lang.includes('IN')) ||
//       voices.find(v => v.lang.includes('en'));

//     if (voice) utterance.voice = voice;

//     utterance.onstart = () => setIsSpeaking(true);
//     utterance.onend = () => {
//       setIsSpeaking(false);
//       resolve();
//     };
//     utterance.onerror = () => {
//       setIsSpeaking(false);
//       resolve();
//     };

//     window.speechSynthesis.speak(utterance);
//   });
// };


//   // const stopSpeaking = () => {
//   //   window.speechSynthesis.cancel();
//   //   setIsSpeaking(false);
//   // };
//   const stopSpeaking = () => {
//   if (window.speechSynthesis.speaking) {
//     window.speechSynthesis.cancel();
//   }
// };


//   const playLanguageLoop = () => {
//     const languages = ['english', 'kannada', 'hindi'];
//     let index = 0;

//     const playNext = () => {
//       if (stage !== 'language') return;

//       const lang = languages[index];
//       speak(texts[lang].languagePrompt, lang);

//       index = (index + 1) % 3;
//       languageLoopRef.current = setTimeout(playNext, 5000);
//     };

//     playNext();
//   };

//   useEffect(() => {
//     if (stage === 'language') {
//       playLanguageLoop();
//     }

//     return () => {
//       if (languageLoopRef.current) {
//         clearTimeout(languageLoopRef.current);
//       }
//       stopSpeaking();
//     };
//   }, [stage, audioEnabled]);

//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (stage === 'language') {
//         if (e.key === '1') {
//           stopSpeaking();
//           if (languageLoopRef.current) clearTimeout(languageLoopRef.current);
//           setLanguage('english');
//           setStage('menu');
//           setTimeout(() => speak(texts.english.welcome + " " + texts.english.options, 'english'), 100);
//         } else if (e.key === '2') {
//           stopSpeaking();
//           if (languageLoopRef.current) clearTimeout(languageLoopRef.current);
//           setLanguage('kannada');
//           setStage('menu');
//           setTimeout(() => speak(texts.kannada.welcome + " " + texts.kannada.options, 'kannada'), 100);
//         } else if (e.key === '3') {
//           stopSpeaking();
//           if (languageLoopRef.current) clearTimeout(languageLoopRef.current);
//           setLanguage('hindi');
//           setStage('menu');
//           setTimeout(() => speak(texts.hindi.welcome + " " + texts.hindi.options, 'hindi'), 100);
//         }
//       } else if (stage === 'menu') {
//         if (e.key === '1') {
//           setInputMode('image');
//           setStage('input');
//         } else if (e.key === '2') {
//           setInputMode('type');
//           setStage('input');
//         } else if (e.key === '3') {
//           setInputMode('voice');
//           setStage('input');
//           startVoiceRecognition();
//         }
//       }
//     };

//     window.addEventListener('keydown', handleKeyPress);
//     return () => window.removeEventListener('keydown', handleKeyPress);
//   }, [stage, language]);

//   const preprocessImage = (imageData) => {
//     return new Promise((resolve) => {
//       const img = new Image();
//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         canvas.width = 224;
//         canvas.height = 224;
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(img, 0, 0, 224, 224);
//         resolve(canvas.toDataURL('image/jpeg'));
//       };
//       img.src = imageData;
//     });
//   };

//   const predictMedicine = async (imageData) => {
//     try {
//       // Preprocess image
//       const processedImage = await preprocessImage(imageData);

//       // Local API endpoint
//       // const API_URL = ' http://localhost:5000';
//       const API_URL = 'https://medwise-kf10.onrender.com/';

//       const formData = new FormData();
//       const blob = await fetch(processedImage).then(r => r.blob());
//       formData.append('image', blob, 'medicine.jpg');

//       const response = await fetch(`${API_URL}/predict`, {
//         method: 'POST',
//         body: formData
//       });

//       if (!response.ok) {
//         throw new Error('API call failed');
//       }

//       const data = await response.json();

//       // Expected response format: { success: true, medicine_info: {...} }
//       if (data.success && data.medicine_info) {
//         return data.medicine_info;
//       }

//       return null;
//     } catch (error) {
//       console.error('Prediction error:', error);
//       // Fallback to mock prediction for demo
//       return mockPrediction();
//     }
//   };

//   const mockPrediction = () => {
//     // For demo purposes - randomly select a medicine
//     const medicines = Object.keys(MEDICINE_DATABASE);
//     const randomMed = medicines[Math.floor(Math.random() * medicines.length)];
//     return MEDICINE_DATABASE[randomMed];
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         processImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ 
//         video: { facingMode: 'environment', width: 1280, height: 720 } 
//       });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         setCameraActive(true);
//       }
//     } catch (err) {
//       alert('Camera access denied');
//     }
//   };

//   const capturePhoto = () => {
//     if (videoRef.current && canvasRef.current) {
//       const canvas = canvasRef.current;
//       const video = videoRef.current;
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       const ctx = canvas.getContext('2d');
//       ctx.drawImage(video, 0, 0);
//       const imageData = canvas.toDataURL('image/jpeg');
//       setImagePreview(imageData);

//       const stream = video.srcObject;
//       stream.getTracks().forEach(track => track.stop());
//       setCameraActive(false);

//       processImage(imageData);
//     }
//   };

//   const processImage = async (imageData) => {
//     setIsProcessing(true);
//     speak(texts[language].processing, language);

//     try {
//       // Call your trained model
//       const medicineInfo = await predictMedicine(imageData);

//       if (!medicineInfo) {
//   setResult({
//     name: texts[language].noResult,
//     uses: "",
//     dosage: "",
//     warnings: ""
//   });
//   setStage("result");
//   speak(texts[language].noResult, language);
//   return;
// }

// const langKey = getLangKey();

// // backend returns: { name: "paracetamol" }
// const key = medicineInfo.name.toLowerCase();

// const data = medicines[key];

// if (!data) {
//   setResult({
//     name: texts[language].noResult,
//     uses: "",
//     dosage: "",
//     warnings: ""
//   });
//   setStage("result");
//   speak(texts[language].noResult, language);
//   return;
// }

// setResult({
//   name: data.name[langKey],
//   uses: data.uses[langKey],
//   dosage: data.dosage[langKey],
//   warnings: data.warnings[langKey]
// });

// setStage("result");

// // 🔊 Speak slowly & sequentially
// await speak(data.name[langKey], language);
// await speak(data.uses[langKey], language);
// await speak(data.dosage[langKey], language);
// await speak(data.warnings[langKey], language);

//     } catch (error) {
//       console.error('Processing error:', error);
//       setResult({ name: 'Error processing image', uses: '', dosage: '', warnings: '' });
//       setStage('result');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const processText = async () => {
//     if (!textInput.trim()) return;

//     setIsProcessing(true);
//     speak(texts[language].processing, language);

//     const searchTerm = textInput.toLowerCase().trim();
//     const medicineInfo = MEDICINE_DATABASE[searchTerm];

//     setTimeout(() => {
//       if (medicineInfo) {
//         setResult(medicineInfo);
//         setStage('result');

//         const resultText = `Information for ${medicineInfo.name}: ${medicineInfo.uses}. ${medicineInfo.dosage}`;
//         speak(resultText, language);
//       } else {
//         setResult({ name: texts[language].noResult, uses: '', dosage: '', warnings: '' });
//         setStage('result');
//         speak(texts[language].noResult, language);
//       }
//       setIsProcessing(false);
//     }, 1000);
//   };

//   const startVoiceRecognition = () => {
//     if (!('webkitSpeechRecognition' in window)) {
//       alert('Voice recognition not supported');
//       return;
//     }

//     const recognition = new webkitSpeechRecognition();
//     recognition.continuous = false;
//     recognition.interimResults = false;
//     recognition.lang = languageCodes[language];

//     recognition.onstart = () => setIsListening(true);

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setTextInput(transcript);
//       setIsListening(false);

//       setTimeout(() => {
//         const searchTerm = transcript.toLowerCase().trim();
//         const medicineInfo = MEDICINE_DATABASE[searchTerm];

//         setIsProcessing(true);
//         speak(texts[language].processing, language);

//         setTimeout(() => {
//           if (medicineInfo) {
//             setResult(medicineInfo);
//             setStage('result');

//             const resultText = `You said ${transcript}. Medicine: ${medicineInfo.name}. ${medicineInfo.uses}`;
//             speak(resultText, language);
//           } else {
//             setResult({ name: texts[language].noResult, uses: '', dosage: '', warnings: '' });
//             setStage('result');
//             speak(texts[language].noResult, language);
//           }
//           setIsProcessing(false);
//         }, 1500);
//       }, 500);
//     };

//     recognition.onerror = () => {
//       setIsListening(false);
//       alert('Voice recognition error');
//     };

//     recognition.onend = () => setIsListening(false);

//     recognitionRef.current = recognition;
//     recognition.start();
//   };

//   const stopVoiceRecognition = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//     }
//   };

//   const resetApp = () => {
//     stopSpeaking();
//     setStage('menu');
//     setInputMode('');
//     setResult(null);
//     setImagePreview(null);
//     setTextInput('');
//     setCameraActive(false);
//     setTimeout(() => speak(texts[language].options, language), 100);
//   };

//   const changeLanguage = () => {
//     stopSpeaking();
//     setStage('language');
//     setLanguage('');
//     setInputMode('');
//     setResult(null);
//     setImagePreview(null);
//     setTextInput('');
//     setCameraActive(false);
//   };

//   const t = language ? texts[language] : texts.english;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//       <div className="max-w-2xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//           <div className="flex items-center justify-between">
//             <h1 className="text-3xl font-bold text-indigo-600">💊 Medwise- Know Your Medicine</h1>
//             <button
//               onClick={() => setAudioEnabled(!audioEnabled)}
//               className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition"
//             >
//               {audioEnabled ? <Volume2 className="w-6 h-6 text-indigo-600" /> : <VolumeX className="w-6 h-6 text-gray-400" />}
//             </button>
//           </div>
//         </div>

//         {/* Language Selection */}
//         {stage === 'language' && (
//           <div className="bg-white rounded-lg shadow-lg p-8">
//             <h2 className="text-2xl font-semibold text-center mb-6">Select Language / ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ / भाषा चुनें</h2>
//             <div className="space-y-4">
//               <button
//                 onClick={() => {
//                   stopSpeaking();
//                   if (languageLoopRef.current) clearTimeout(languageLoopRef.current);
//                   setLanguage('english');
//                   setStage('menu');
//                   setTimeout(() => speak(texts.english.welcome + " " + texts.english.options, 'english'), 100);
//                 }}
//                 className="w-full p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-lg font-semibold transition transform hover:scale-105"
//               >
//                 1 - English
//               </button>
//               <button
//                 onClick={() => {
//                   stopSpeaking();
//                   if (languageLoopRef.current) clearTimeout(languageLoopRef.current);
//                   setLanguage('kannada');
//                   setStage('menu');
//                   setTimeout(() => speak(texts.kannada.welcome + " " + texts.kannada.options, 'kannada'), 100);
//                 }}
//                 className="w-full p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-lg font-semibold transition transform hover:scale-105"
//               >
//                 2 - ಕನ್ನಡ (Kannada)
//               </button>
//               <button
//                 onClick={() => {
//                   stopSpeaking();
//                   if (languageLoopRef.current) clearTimeout(languageLoopRef.current);
//                   setLanguage('hindi');
//                   setStage('menu');
//                   setTimeout(() => speak(texts.hindi.welcome + " " + texts.hindi.options, 'hindi'), 100);
//                 }}
//                 className="w-full p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-lg font-semibold transition transform hover:scale-105"
//               >
//                 3 - हिंदी (Hindi)
//               </button>
//             </div>
//             {isSpeaking && (
//               <div className="mt-6 text-center">
//                 <div className="inline-block animate-pulse text-indigo-600 text-lg">
//                   🔊 Playing instructions...
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Menu */}
//         {stage === 'menu' && (
//           <div className="bg-white rounded-lg shadow-lg p-8">
//             <h2 className="text-2xl font-semibold text-center mb-6">{t.welcome}</h2>
//             <div className="space-y-4">
//               <button
//                 onClick={() => {
//                   setInputMode('image');
//                   setStage('input');
//                 }}
//                 className="w-full p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-3 text-lg font-semibold transition transform hover:scale-105"
//               >
//                 <Camera className="w-6 h-6" />
//                 1 - {t.imageOption}
//               </button>
//               <button
//                 onClick={() => {
//                   setInputMode('type');
//                   setStage('input');
//                 }}
//                 className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-3 text-lg font-semibold transition transform hover:scale-105"
//               >
//                 <Type className="w-6 h-6" />
//                 2 - {t.typeOption}
//               </button>
//               <button
//                 onClick={() => {
//                   setInputMode('voice');
//                   setStage('input');
//                   setTimeout(startVoiceRecognition, 500);
//                 }}
//                 className="w-full p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-3 text-lg font-semibold transition transform hover:scale-105"
//               >
//                 <Mic className="w-6 h-6" />
//                 3 - {t.voiceOption}
//               </button>
//             </div>
//             <button
//               onClick={changeLanguage}
//               className="w-full mt-6 p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
//             >
//               {t.changeLanguage}
//             </button>
//           </div>
//         )}

//         {/* Input Stage */}
//         {stage === 'input' && (
//           <div className="bg-white rounded-lg shadow-lg p-8">
//             {inputMode === 'image' && (
//               <div>
//                 <h2 className="text-2xl font-semibold mb-6">{t.uploadOrCapture}</h2>

//                 {!cameraActive && !imagePreview && (
//                   <div className="space-y-4">
//                     <label className="block">
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageUpload}
//                         className="hidden"
//                         id="imageUpload"
//                       />
//                       <div className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition">
//                         <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
//                         <span className="text-lg">{t.upload}</span>
//                       </div>
//                     </label>
//                     <button
//                       onClick={startCamera}
//                       className="w-full p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 transition"
//                     >
//                       <Camera className="w-6 h-6" />
//                       {t.capture}
//                     </button>
//                   </div>
//                 )}

//                 {cameraActive && (
//                   <div className="space-y-4">
//                     <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg shadow-md" />
//                     <button
//                       onClick={capturePhoto}
//                       className="w-full p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
//                     >
//                       📸 Capture Photo
//                     </button>
//                   </div>
//                 )}

//                 {imagePreview && (
//                   <div className="space-y-4">
//                     <img src={imagePreview} alt="Preview" className="w-full rounded-lg shadow-md" />
//                     {isProcessing && (
//                       <div className="text-center py-4">
//                         <div className="animate-spin w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto"></div>
//                         <p className="mt-4 text-lg">{t.processing}</p>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 <canvas ref={canvasRef} className="hidden" />
//               </div>
//             )}

//             {inputMode === 'type' && (
//               <div>
//                 <h2 className="text-2xl font-semibold mb-6">{t.typeOption}</h2>
//                 <input
//                   type="text"
//                   value={textInput}
//                   onChange={(e) => setTextInput(e.target.value)}
//                   placeholder={t.enterName}
//                   className="w-full p-4 border-2 border-gray-300 rounded-lg mb-4 text-lg focus:border-indigo-500 focus:outline-none"
//                   onKeyPress={(e) => e.key === 'Enter' && processText()}
//                 />
//                 <button
//                   onClick={processText}
//                   disabled={!textInput.trim() || isProcessing}
//                   className="w-full p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
//                 >
//                   {isProcessing ? t.processing : t.submit}
//                 </button>
//               </div>
//             )}

//             {inputMode === 'voice' && (
//               <div>
//                 <h2 className="text-2xl font-semibold mb-6">{t.voiceOption}</h2>
//                 <div className="text-center py-8">
//                   {isListening ? (
//                     <div>
//                       <div className="w-24 h-24 mx-auto mb-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
//                         <Mic className="w-12 h-12 text-white" />
//                       </div>
//                       <p className="text-xl mb-4">Listening...</p>
//                       <button
//                         onClick={stopVoiceRecognition}
//                         className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
//                       >
//                         {t.stopVoice}
//                       </button>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={startVoiceRecognition}
//                       className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-lg transition transform hover:scale-105"
//                     >
//                       <Mic className="w-6 h-6 inline mr-2" />
//                       {t.startVoice}
//                     </button>
//                   )}
//                   {textInput && (
//                     <div className="mt-6 p-4 bg-gray-100 rounded-lg">
//                       <p className="text-lg">"{textInput}"</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {!isProcessing && (
//               <button
//                 onClick={resetApp}
//                 className="w-full mt-6 p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
//               >
//                 {t.backToMenu}
//               </button>
//             )}
//           </div>
//         )}

//         {/* Result Stage */}
//         {stage === 'result' && result && (
//           <div className="bg-white rounded-lg shadow-lg p-8">
//             <h2 className="text-2xl font-bold text-indigo-600 mb-6">{t.result}</h2>
//             <div className="space-y-4">
//               <div className="border-b pb-3">
//                 <h3 className="font-semibold text-gray-600">Medicine Name:</h3>
//                 <p className="text-xl font-bold">{result.name}</p>
//               </div>
//               {result.uses && (
//                 <div className="border-b pb-3">
//                   <h3 className="font-semibold text-gray-600">Uses:</h3>
//                   <p>{result.uses}</p>
//                 </div>
//               )}
//               {result.dosage && (
//                 <div className="border-b pb-3">
//                   <h3 className="font-semibold text-gray-600">Dosage:</h3>
//                   <p>{result.dosage}</p>
//                 </div>
//               )}
//               {result.warnings && (
//                 <div className="pb-3">
//                   <h3 className="font-semibold text-gray-600">Warnings:</h3>
//                   <p className="text-red-600 font-semibold">{result.warnings}</p>
//                 </div>
//               )}
//             </div>
//             <div className="flex gap-3 mt-6">
//               <button
//                 onClick={resetApp}
//                 className="flex-1 p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
//               >
//                 {t.backToMenu}
//               </button>
//               <button
//                 onClick={changeLanguage}
//                 className="flex-1 p-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
//               >
//                 {t.changeLanguage}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MedWise

import React, { useState, useEffect, useRef } from 'react';
import { Camera, Upload, Mic, Type, Phone, Ambulance, Video, Bell, HelpCircle, Volume2, VolumeX, Square, ChevronRight, CheckCircle, AlertTriangle, Clock, Heart, Shield, User, Menu, X } from 'lucide-react';
import medicineDatabase from '../medicine.json';

const API_URL = 'http://localhost:5000';
// const API_URL = "https://medwise-kf10.onrender.com";

// Translation strings
const translations = {
  en: {
    appTitle: "MedWise",
    appSubtitle: "Know Your Medicine",
    selectLanguage: "Select Your Language",
    continue: "Continue",
    menu: "Menu",
    scanMedicine: "Scan Medicine",
    uploadImage: "Upload Image",
    searchByName: "Search by Name",
    voiceSearch: "Voice Search",
    emergency: "Emergency",
    reminders: "Reminders",
    help: "Help & Support",
    takePicture: "Take Picture",
    retake: "Retake",
    analyze: "Analyze Medicine",
    analyzing: "Analyzing medicine...",
    enterMedicineName: "Enter medicine name",
    search: "Search",
    startSpeaking: "Tap and start speaking...",
    listening: "Listening...",
    medicineInfo: "Medicine Information",
    uses: "Uses",
    dosage: "Dosage",
    sideEffects: "Side Effects",
    warnings: "Warnings",
    manufacturer: "Manufacturer",
    audioControls: "Audio Controls",
    muteAudio: "Mute",
    unmuteAudio: "Unmute",
    stopSpeech: "Stop Speech",
    callFamily: "Call Family",
    callAmbulance: "Call Ambulance",
    virtualDoctor: "Virtual Doctor",
    emergencyContacts: "Emergency Contacts",
    setReminder: "Set Medication Reminder",
    medicineName: "Medicine Name",
    dosageTime: "Dosage Time",
    frequency: "Frequency",
    daily: "Daily",
    twiceDaily: "Twice Daily",
    weekly: "Weekly",
    saveReminder: "Save Reminder",
    yourReminders: "Your Reminders",
    noReminders: "No reminders set",
    deleteReminder: "Delete",
    helpSupport: "Help & Support",
    reportIssue: "Report an Issue",
    requestGuidance: "Request Guidance",
    yourMessage: "Your message...",
    submit: "Submit",
    thankYou: "Thank you! We'll get back to you soon.",
    notFound: "Medicine not found in database",
    tryAgain: "Try Again",
    backToMenu: "Back to Menu",
    cameraNotSupported: "Camera not supported on this device",
    micNotSupported: "Microphone not supported on this device",
    permissionDenied: "Permission denied. Please allow camera/microphone access.",
    noImageSelected: "Please select an image first",
    genericName: "Generic Name"
  },
  kn: {
    appTitle: "ಮೆಡ್‌ವೈಸ್",
    appSubtitle: "ನಿಮ್ಮ ಔಷಧಿ ತಿಳಿಯಿರಿ",
    selectLanguage: "ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    continue: "ಮುಂದುವರಿಸಿ",
    menu: "ಮೆನು",
    scanMedicine: "ಔಷಧಿ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    uploadImage: "ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    searchByName: "ಹೆಸರಿನಿಂದ ಹುಡುಕಿ",
    voiceSearch: "ಧ್ವನಿ ಹುಡುಕಾಟ",
    emergency: "ತುರ್ತು",
    reminders: "ಜ್ಞಾಪನೆಗಳು",
    help: "ಸಹಾಯ ಮತ್ತು ಬೆಂಬಲ",
    takePicture: "ಫೋಟೋ ತೆಗೆಯಿರಿ",
    retake: "ಮರುತೆಗೆಯಿರಿ",
    analyze: "ಔಷಧಿ ವಿಶ್ಲೇಷಿಸಿ",
    analyzing: "ಔಷಧಿ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    enterMedicineName: "ಔಷಧಿ ಹೆಸರು ನಮೂದಿಸಿ",
    search: "ಹುಡುಕಿ",
    startSpeaking: "ಟ್ಯಾಪ್ ಮಾಡಿ ಮತ್ತು ಮಾತನಾಡಲು ಪ್ರಾರಂಭಿಸಿ...",
    listening: "ಆಲಿಸಲಾಗುತ್ತಿದೆ...",
    medicineInfo: "ಔಷಧಿ ಮಾಹಿತಿ",
    uses: "ಬಳಕೆಗಳು",
    dosage: "ಪ್ರಮಾಣ",
    sideEffects: "ಅಡ್ಡ ಪರಿಣಾಮಗಳು",
    warnings: "ಎಚ್ಚರಿಕೆಗಳು",
    manufacturer: "ತಯಾರಕರು",
    audioControls: "ಆಡಿಯೋ ನಿಯಂತ್ರಣಗಳು",
    muteAudio: "ಮ್ಯೂಟ್",
    unmuteAudio: "ಅನ್‌ಮ್ಯೂಟ್",
    stopSpeech: "ಭಾಷಣ ನಿಲ್ಲಿಸಿ",
    callFamily: "ಕುಟುಂಬಕ್ಕೆ ಕರೆ",
    callAmbulance: "ಆಂಬ್ಯುಲೆನ್ಸ್ ಕರೆ",
    virtualDoctor: "ವರ್ಚುವಲ್ ಡಾಕ್ಟರ್",
    emergencyContacts: "ತುರ್ತು ಸಂಪರ್ಕಗಳು",
    setReminder: "ಔಷಧಿ ಜ್ಞಾಪನೆ ಹೊಂದಿಸಿ",
    medicineName: "ಔಷಧಿ ಹೆಸರು",
    dosageTime: "ಪ್ರಮಾಣದ ಸಮಯ",
    frequency: "ಆವರ್ತನ",
    daily: "ದೈನಂದಿನ",
    twiceDaily: "ದಿನಕ್ಕೆ ಎರಡು ಬಾರಿ",
    weekly: "ವಾರಕ್ಕೊಮ್ಮೆ",
    saveReminder: "ಜ್ಞಾಪನೆ ಉಳಿಸಿ",
    yourReminders: "ನಿಮ್ಮ ಜ್ಞಾಪನೆಗಳು",
    noReminders: "ಯಾವುದೇ ಜ್ಞಾಪನೆಗಳು ಹೊಂದಿಸಲಾಗಿಲ್ಲ",
    deleteReminder: "ಅಳಿಸಿ",
    helpSupport: "ಸಹಾಯ ಮತ್ತು ಬೆಂಬಲ",
    reportIssue: "ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಿ",
    requestGuidance: "ಮಾರ್ಗದರ್ಶನ ವಿನಂತಿಸಿ",
    yourMessage: "ನಿಮ್ಮ ಸಂದೇಶ...",
    submit: "ಸಲ್ಲಿಸಿ",
    thankYou: "ಧನ್ಯವಾದಗಳು! ನಾವು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.",
    notFound: "ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ಔಷಧಿ ಕಂಡುಬಂದಿಲ್ಲ",
    tryAgain: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
    backToMenu: "ಮೆನುಗೆ ಹಿಂತಿರುಗಿ",
    cameraNotSupported: "ಈ ಸಾಧನದಲ್ಲಿ ಕ್ಯಾಮೆರಾ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ",
    micNotSupported: "ಈ ಸಾಧನದಲ್ಲಿ ಮೈಕ್ರೊಫೋನ್ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ",
    permissionDenied: "ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ. ದಯವಿಟ್ಟು ಕ್ಯಾಮೆರಾ/ಮೈಕ್ರೊಫೋನ್ ಪ್ರವೇಶವನ್ನು ಅನುಮತಿಸಿ.",
    noImageSelected: "ದಯವಿಟ್ಟು ಮೊದಲು ಚಿತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    genericName: "ಜೆನೆರಿಕ್ ಹೆಸರು"
  },
  hi: {
    appTitle: "मेडवाइज",
    appSubtitle: "अपनी दवा जानें",
    selectLanguage: "अपनी भाषा चुनें",
    continue: "जारी रखें",
    menu: "मेनू",
    scanMedicine: "दवा स्कैन करें",
    uploadImage: "छवि अपलोड करें",
    searchByName: "नाम से खोजें",
    voiceSearch: "आवाज़ खोज",
    emergency: "आपातकालीन",
    reminders: "रिमाइंडर",
    help: "सहायता और समर्थन",
    takePicture: "तस्वीर लें",
    retake: "फिर से लें",
    analyze: "दवा का विश्लेषण करें",
    analyzing: "दवा का विश्लेषण हो रहा है...",
    enterMedicineName: "दवा का नाम दर्ज करें",
    search: "खोजें",
    startSpeaking: "टैप करें और बोलना शुरू करें...",
    listening: "सुन रहा है...",
    medicineInfo: "दवा की जानकारी",
    uses: "उपयोग",
    dosage: "खुराक",
    sideEffects: "दुष्प्रभाव",
    warnings: "चेतावनी",
    manufacturer: "निर्माता",
    audioControls: "ऑडियो नियंत्रण",
    muteAudio: "म्यूट करें",
    unmuteAudio: "अनम्यूट करें",
    stopSpeech: "भाषण बंद करें",
    callFamily: "परिवार को कॉल करें",
    callAmbulance: "एंबुलेंस बुलाएं",
    virtualDoctor: "वर्चुअल डॉक्टर",
    emergencyContacts: "आपातकालीन संपर्क",
    setReminder: "दवा रिमाइंडर सेट करें",
    medicineName: "दवा का नाम",
    dosageTime: "खुराक का समय",
    frequency: "आवृत्ति",
    daily: "दैनिक",
    twiceDaily: "दिन में दो बार",
    weekly: "साप्ताहिक",
    saveReminder: "रिमाइंडर सहेजें",
    yourReminders: "आपके रिमाइंडर",
    noReminders: "कोई रिमाइंडर सेट नहीं है",
    deleteReminder: "हटाएं",
    helpSupport: "सहायता और समर्थन",
    reportIssue: "समस्या की रिपोर्ट करें",
    requestGuidance: "मार्गदर्शन का अनुरोध करें",
    yourMessage: "आपका संदेश...",
    submit: "जमा करें",
    thankYou: "धन्यवाद! हम जल्द ही आपसे संपर्क करेंगे।",
    notFound: "डेटाबेस में दवा नहीं मिली",
    tryAgain: "पुनः प्रयास करें",
    backToMenu: "मेनू पर वापस जाएं",
    cameraNotSupported: "इस डिवाइस पर कैमरा समर्थित नहीं है",
    micNotSupported: "इस डिवाइस पर माइक्रोफोन समर्थित नहीं है",
    permissionDenied: "अनुमति अस्वीकृत। कृपया कैमरा/माइक्रोफोन एक्सेस की अनुमति दें।",
    noImageSelected: "कृपया पहले एक छवि चुनें",
    genericName: "सामान्य नाम"
  }
};



export default function MedWiseApp() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('language');
  const [medicineData, setMedicineData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  const [authScreen, setAuthScreen] = useState("login");

  const videoRef = useRef(null);
  const canvasRef = useRef(null);


  const screenInstructions = {
    camera: {
      en: "Point the camera at the medicine strip and tap Take Picture.",
      kn: "ಔಷಧಿ ಸ್ಟ್ರಿಪ್ ಮೇಲೆ ಕ್ಯಾಮೆರಾವನ್ನು ನೆಟ್ಟಗೆ ಹಿಡಿದು ಫೋಟೋ ತೆಗೆಯಿರಿ.",
      hi: "दवा की पट्टी पर कैमरा रखें और तस्वीर लें।"
    },
    upload: {
      en: "Select a clear image of the medicine from your device.",
      kn: "ನಿಮ್ಮ ಸಾಧನದಿಂದ ಔಷಧಿಯ ಸ್ಪಷ್ಟ ಚಿತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
      hi: "अपने डिवाइस से दवा की साफ तस्वीर चुनें।"
    },
    text: {
      en: "Type the medicine name and press search.",
      kn: "ಔಷಧಿಯ ಹೆಸರನ್ನು ನಮೂದಿಸಿ ಮತ್ತು ಹುಡುಕಿ ಒತ್ತಿ.",
      hi: "दवा का नाम लिखें और खोजें दबाएँ।"
    },
    voice: {
      en: "Tap the microphone and clearly speak the medicine name.",
      kn: "ಮೈಕ್ರೊಫೋನ್ ಮೇಲೆ ಟ್ಯಾಪ್ ಮಾಡಿ ಔಷಧಿಯ ಹೆಸರನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ಹೇಳಿ.",
      hi: "माइक्रोफोन दबाएँ और दवा का नाम स्पष्ट बोलें।"
    }
  };


  const analyzeImageWithBackend = async (imageDataUrl) => {
    setIsLoading(true);
    setError(null);

    try {
      const blob = await fetch(imageDataUrl).then(r => r.blob());
      const formData = new FormData();
      formData.append("image", blob, "medicine.jpg");

      const res = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        throw new Error("Backend not responding (server waking up)");
      }

      const data = await res.json();
      // expected: { success: true, predicted_class: "paracetamol" }

      if (!data.success || !data.predicted_class) {
        throw new Error(t.notFound);
      }

      const medicine = getMedicineInfo(data.predicted_class);

      if (!medicine) {
        throw new Error(t.notFound);
      }

      setMedicineData(medicine);
      setCurrentScreen("result");
      speakText(medicine.name, selectedLanguage);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
  fetchReminders();
}, [token]);

  // choosen input method instructions loop
  useEffect(() => {
    if (
      screenInstructions[currentScreen] &&
      selectedLanguage &&
      !isMuted
    ) {
      window.speechSynthesis.cancel();

      const instruction =
        screenInstructions[currentScreen][selectedLanguage];

      const timer = setTimeout(() => {
        speakText(instruction, selectedLanguage);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [currentScreen, selectedLanguage, isMuted]);

  // input option menu loop
  useEffect(() => {
    if (currentScreen !== "menu" || !selectedLanguage || isMuted) return;

    const menuText = `
    ${t.scanMedicine}.
    ${t.uploadImage}.
    ${t.searchByName}.
    ${t.voiceSearch}.
  `;

    let intervalId;

    // Speak once quickly
    const startTimer = setTimeout(() => {
      speakText(menuText, selectedLanguage);

      // Repeat until user leaves menu
      intervalId = setInterval(() => {
        speakText(menuText, selectedLanguage);
      }, 9000);
    }, 500);

    return () => {
      clearTimeout(startTimer);
      if (intervalId) clearInterval(intervalId);
      window.speechSynthesis.cancel();
    };
  }, [currentScreen, selectedLanguage, isMuted]);


  //  result screen medicine info loop
  useEffect(() => {
    if (currentScreen === "result" && medicineData && !isMuted) {
      window.speechSynthesis.cancel();

      const fullInfo = `
      ${t.medicineInfo}.
      ${medicineData.name}.
      ${t.genericName}: ${medicineData.genericName}.
      ${t.uses}: ${medicineData.uses}.
      ${t.dosage}: ${medicineData.dosage}.
      ${t.sideEffects}: ${medicineData.sideEffects}.
      ${t.warnings}: ${medicineData.warnings}.
    `;

      // Small delay ensures UI is painted before speech
      const timer = setTimeout(() => {
        speakText(fullInfo, selectedLanguage);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [currentScreen, medicineData, selectedLanguage, isMuted]);

  // language selection screen instructions loop
  useEffect(() => {
    if (!isAuthenticated || currentScreen !== "language" || isMuted) return;

    const languages = ["en", "kn", "hi"];
    const prompts = {
      en: "Press 1 for English",
      kn: "ಕನ್ನಡಕ್ಕೆ 2 ಒತ್ತಿ",
      hi: "हिंदी के लिए 3 दबाएं"
    };

    let index = 0;
    let intervalId;

    // 🔹 Speak almost immediately
    const startTimer = setTimeout(() => {
      speakText(prompts[languages[index]], languages[index]);
      index++;

      // 🔹 Then repeat
      intervalId = setInterval(() => {
        speakText(prompts[languages[index % languages.length]], languages[index % languages.length]);
        index++;
      }, 2500); // faster cycle
    }, 200); // 🔥 faster start

    return () => {
      clearTimeout(startTimer);
      if (intervalId) clearInterval(intervalId);
      window.speechSynthesis.cancel();
    };
  }, [currentScreen, isMuted, isAuthenticated]);

  

  const t = selectedLanguage ? translations[selectedLanguage] : translations.en;

  const speakText = (text, language) => {
    if (isMuted || !text) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const langCodes = { en: 'en-US', kn: 'kn-IN', hi: 'hi-IN' };
    utterance.lang = langCodes[language] || 'en-US';
    utterance.rate = 0.7;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  // Function to get medicine data from JSON based on language
  const getMedicineInfo = (medicineName) => {
    const medicineKey = medicineName.toLowerCase().replace(/ /g, '-');
    const medicine = medicineDatabase[medicineKey];

    if (!medicine) return null;

    return {
      name: medicine.name[selectedLanguage],
      genericName: medicine.genericName[selectedLanguage],
      uses: medicine.uses[selectedLanguage],
      dosage: medicine.dosage[selectedLanguage],
      sideEffects: medicine.sideEffects[selectedLanguage],
      warnings: medicine.warnings[selectedLanguage],
      manufacturer: medicine.manufacturer[selectedLanguage],
      image: medicine.image
    };
  };

  const LoginScreen = ({ switchToRegister }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleLogin = async () => {
      try {
        const res = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error);

        localStorage.setItem("token", data.token);
        setToken(data.token);
        setIsAuthenticated(true);
        setCurrentScreen("language");
      } catch (err) {
        setErrorMsg(err.message);
      }
    };

    return (
      <div className="language-selector-screen">
        <div className="language-container">
          <h2>Login</h2>

          <input
            className="form-input"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="form-input"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button className="primary-btn" onClick={handleLogin}>
            Login
          </button>

          {errorMsg && <p className="error-message">{errorMsg}</p>}
        </div>
        <p style={{ marginTop: "1rem", cursor: "pointer", color: "#667eea" }}
          onClick={switchToRegister}>
          Don't have an account? Register
        </p>
      </div>
    );
  };

  const RegisterScreen = ({ switchToLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleRegister = async () => {
      try {
        const res = await fetch(`${API_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error);

        setSuccessMsg("Registration successful! Please login.");
        setErrorMsg("");
        setUsername("");
        setPassword("");
      } catch (err) {
        setErrorMsg(err.message);
        setSuccessMsg("");
      }
    };

    return (
      <div className="language-selector-screen">
        <div className="language-container">
          <h2>Create Account</h2>

          <input
            className="form-input"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="form-input"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button className="primary-btn" onClick={handleRegister}>
            Register
          </button>

          {errorMsg && <p className="error-message">{errorMsg}</p>}
          {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}

          <p style={{ marginTop: "1rem", cursor: "pointer", color: "#667eea" }}
            onClick={switchToLogin}>
            Already have an account? Login
          </p>
        </div>
      </div>
    );
  };

  const LanguageSelector = () => (
    <div className="language-selector-screen">
      <div className="language-container">
        <div className="logo-section">
          <div className="logo-icon">
            <Heart className="heart-pulse" />
          </div>
          <h1 className="app-title">MedWise</h1>
          <p className="app-subtitle">Know Your Medicine</p>
        </div>

        <div className="language-options">
          <h2 className="select-language-title">Select Your Language / ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ / अपनी भाषा चुनें</h2>

          <div className="language-buttons">
            {['en', 'kn', 'hi'].map(lang => (
              <button
                key={lang}
                className="language-btn"
                onClick={() => {
                  setSelectedLanguage(lang);
                  localStorage.setItem('medwise-language', lang);
                  setCurrentScreen('menu');
                  const welcomeTexts = {
                    en: 'Welcome to MedWise. Know Your Medicine.',
                    kn: 'ಮೆಡ್‌ವೈಸ್‌ಗೆ ಸ್ವಾಗತ. ನಿಮ್ಮ ಔಷಧಿ ತಿಳಿಯಿರಿ.',
                    hi: 'मेडवाइज में आपका स्वागत है। अपनी दवा जानें।'
                  };
                  speakText(welcomeTexts[lang], lang);
                }}
              >
                <span className="lang-flag">{lang === 'en' ? '🇬🇧' : '🇮🇳'}</span>
                <span className="lang-name">
                  {lang === 'en' ? 'English' : lang === 'kn' ? 'ಕನ್ನಡ (Kannada)' : 'हिंदी (Hindi)'}
                </span>
                <ChevronRight />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const MainMenu = () => {


    return (
      <div className="main-menu-screen">
        <header className="app-header">
          <button className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
          <div className="header-title">
            <Heart className="header-icon" />
            <div>
              <h1>{t.appTitle}</h1>
              <p>{t.appSubtitle}</p>
            </div>
          </div>
          <button
            className="lang-switch"
            onClick={() => {
              setCurrentScreen('language');
              setSelectedLanguage(null);
            }}
          >
            {selectedLanguage === 'en' ? '🇬🇧' : selectedLanguage === 'kn' ? 'ಕನ್ನಡ' : 'हिं'}
          </button>
          <button
            className="lang-switch"
            onClick={() => {
              localStorage.removeItem("token");
              setIsAuthenticated(false);
              setToken(null);
              setCurrentScreen("language");
            }}
          >
            Logout
          </button>
        </header>

        <div className={`side-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <button className="side-menu-item" onClick={() => { setCurrentScreen('emergency'); setMobileMenuOpen(false); }}>
            <Phone /> {t.emergency}
          </button>
          <button className="side-menu-item" onClick={() => { setCurrentScreen('reminders'); setMobileMenuOpen(false); }}>
            <Bell /> {t.reminders}
          </button>
          <button className="side-menu-item" onClick={() => { setCurrentScreen('help'); setMobileMenuOpen(false); }}>
            <HelpCircle /> {t.help}
          </button>
        </div>

        <div className="menu-grid">
          <button className="menu-card primary" onClick={() => setCurrentScreen('camera')}>
            <Camera className="menu-icon" />
            <h3>{t.scanMedicine}</h3>
            <p>Take a photo of your medicine</p>
          </button>

          <button className="menu-card" onClick={() => setCurrentScreen('upload')}>
            <Upload className="menu-icon" />
            <h3>{t.uploadImage}</h3>
            <p>Upload from your device</p>
          </button>

          <button className="menu-card" onClick={() => setCurrentScreen('text')}>
            <Type className="menu-icon" />
            <h3>{t.searchByName}</h3>
            <p>Type medicine name</p>
          </button>

          <button className="menu-card" onClick={() => setCurrentScreen('voice')}>
            <Mic className="menu-icon" />
            <h3>{t.voiceSearch}</h3>
            <p>Speak medicine name</p>
          </button>
        </div>

        <AudioControlPanel />
      </div>
    );
  };

  const CameraCapture = () => {
    const [stream, setStream] = useState(null);
    const [captured, setCaptured] = useState(false);

    useEffect(() => {
      startCamera();
      return () => {
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
      };
    }, [stream]);

    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setStream(mediaStream);
      } catch (err) {
        setError(t.permissionDenied);
      }
    };

    const captureImage = () => {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      if (canvas && video) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        setCaptured(true);
      }
    };

    const analyzeImage = async () => {
      if (!capturedImage) {
        setError(t.noImageSelected);
        return;
      }
      analyzeImageWithBackend(capturedImage);
    };


    return (
      <div className="camera-screen">
        <div className="screen-header">
          <button className="back-btn" onClick={() => setCurrentScreen('menu')}>
            ← {t.backToMenu}
          </button>
          <h2>{t.scanMedicine}</h2>
        </div>

        <div className="camera-container">
          {!captured ? (
            <>
              <video ref={videoRef} autoPlay playsInline className="camera-video" />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
              <div className="camera-overlay">
                <div className="scan-frame"></div>
              </div>
              <button className="capture-btn" onClick={captureImage}>
                <Camera />
                {t.takePicture}
              </button>
            </>
          ) : (
            <>
              <img src={capturedImage} alt="Captured medicine" className="captured-image" />
              <div className="capture-actions">
                <button className="secondary-btn" onClick={() => setCaptured(false)}>
                  {t.retake}
                </button>
                <button className="primary-btn" onClick={analyzeImage} disabled={isLoading}>
                  {isLoading ? t.analyzing : t.analyze}
                </button>
              </div>
            </>
          )}
        </div>

        {error && <div className="error-message">{error}</div>}
      </div>
    );
  };

  const ImageUploader = () => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setUploadedImage(e.target.result);
        reader.readAsDataURL(file);
      }
    };

    const analyzeImage = async () => {
      if (!uploadedImage) {
        setError(t.noImageSelected);
        return;
      }
      analyzeImageWithBackend(uploadedImage);
    };


    return (
      <div className="upload-screen">
        <div className="screen-header">
          <button className="back-btn" onClick={() => setCurrentScreen('menu')}>
            ← {t.backToMenu}
          </button>
          <h2>{t.uploadImage}</h2>
        </div>

        <div className="upload-container">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            style={{ display: 'none' }}
          />

          {!uploadedImage ? (
            <button
              className="upload-zone"
              onClick={() => fileInputRef.current.click()}
            >
              <Upload className="upload-icon" />
              <p>Tap to select image</p>
              <p className="upload-hint">JPG, PNG or JPEG</p>
            </button>
          ) : (
            <>
              <img src={uploadedImage} alt="Uploaded medicine" className="uploaded-image" />
              <div className="upload-actions">
                <button className="secondary-btn" onClick={() => setUploadedImage(null)}>
                  {t.tryAgain}
                </button>
                <button className="primary-btn" onClick={analyzeImage} disabled={isLoading}>
                  {isLoading ? t.analyzing : t.analyze}
                </button>
              </div>
            </>
          )}
        </div>

        {error && <div className="error-message">{error}</div>}
      </div>
    );
  };

  const TextInputSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
      if (!searchTerm.trim()) return;

      setIsLoading(true);
      setError(null);

      setTimeout(() => {
        const medicine = getMedicineInfo(searchTerm);

        if (medicine) {
          setMedicineData(medicine);
          setCurrentScreen('result');
        } else {
          setError(t.notFound);
        }
        setIsLoading(false);
      }, 1000);
    };

    return (
      <div className="text-search-screen">
        <div className="screen-header">
          <button className="back-btn" onClick={() => setCurrentScreen('menu')}>
            ← {t.backToMenu}
          </button>
          <h2>{t.searchByName}</h2>
        </div>

        <div className="search-container">
          <div className="search-input-group">
            <Type className="search-icon" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.enterMedicineName}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="search-input"
            />
          </div>
          <button
            className="primary-btn search-btn"
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? t.analyzing : t.search}
          </button>

          <div className="search-suggestions">
            <p className="suggestions-title">Try searching:</p>
            <button className="suggestion-chip" onClick={() => setSearchTerm('Paracetamol')}>
              Paracetamol
            </button>
            <button className="suggestion-chip" onClick={() => setSearchTerm('Cetrizine')}>
              Cetrizine
            </button>
            <button className="suggestion-chip" onClick={() => setSearchTerm('Zerodol')}>
              Zerodol
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
      </div>
    );
  };

  const VoiceInput = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const recognitionRef = useRef(null);

    useEffect(() => {
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();

        const langCodes = { en: 'en-US', kn: 'kn-IN', hi: 'hi-IN' };
        recognitionRef.current.lang = langCodes[selectedLanguage];
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
          setTranscript(transcript);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
          if (transcript) {
            searchByVoice(transcript);
          }
        };
      }
    }, [selectedLanguage, transcript]);

    const startListening = () => {
      if (recognitionRef.current) {
        setTranscript('');
        setIsListening(true);
        recognitionRef.current.start();
      }
    };

    const stopListening = () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };

    const searchByVoice = (text) => {
      setIsLoading(true);
      setError(null);

      setTimeout(() => {
        const medicine = getMedicineInfo(text);

        if (medicine) {
          setMedicineData(medicine);
          setCurrentScreen('result');
        } else {
          setError(t.notFound);
        }
        setIsLoading(false);
      }, 1000);
    };

    return (
      <div className="voice-search-screen">
        <div className="screen-header">
          <button className="back-btn" onClick={() => setCurrentScreen('menu')}>
            ← {t.backToMenu}
          </button>
          <h2>{t.voiceSearch}</h2>
        </div>

        <div className="voice-container">
          <button
            className={`voice-btn ${isListening ? 'listening' : ''}`}
            onClick={isListening ? stopListening : startListening}
            disabled={isLoading}
          >
            <Mic className="voice-icon" />
          </button>

          <p className="voice-status">
            {isListening ? t.listening : t.startSpeaking}
          </p>

          {transcript && (
            <div className="transcript">
              <p className="transcript-label">You said:</p>
              <p className="transcript-text">{transcript}</p>
            </div>
          )}

          {isLoading && <div className="loading-spinner"></div>}
        </div>

        {error && <div className="error-message">{error}</div>}
      </div>
    );
  };

  const MedicineResultCard = () => {
    if (!medicineData) return null;

    return (
      <div className="result-screen">
        <div className="screen-header">
          <button className="back-btn" onClick={() => {
            setCurrentScreen('menu');
            setMedicineData(null);
            stopSpeech();
          }}>
            ← {t.backToMenu}
          </button>
          <h2>{t.medicineInfo}</h2>
        </div>

        <div className="medicine-card">
          <div className="medicine-header">
            <div className="medicine-image">
              <img src={medicineData.image} alt={medicineData.name} className="medicine-img" />
            </div>
            <div className="medicine-title">
              <h3>{medicineData.name}</h3>
              <p className="generic-name">{medicineData.genericName}</p>
            </div>
          </div>

          <div className="medicine-sections">
            <div className="info-section">
              <h4><CheckCircle /> {t.uses}</h4>
              <p>{medicineData.uses}</p>
            </div>

            <div className="info-section">
              <h4><Clock /> {t.dosage}</h4>
              <p>{medicineData.dosage}</p>
            </div>

            <div className="info-section warning-section">
              <h4><AlertTriangle /> {t.sideEffects}</h4>
              <p>{medicineData.sideEffects}</p>
            </div>

            <div className="info-section warning-section">
              <h4><Shield /> {t.warnings}</h4>
              <p>{medicineData.warnings}</p>
            </div>

            <div className="info-section">
              <h4><User /> {t.manufacturer}</h4>
              <p>{medicineData.manufacturer}</p>
            </div>
          </div>
        </div>

        <AudioControlPanel />
      </div>
    );
  };

  const AudioControlPanel = () => (
    <div className="audio-controls">
      <button
        className={`audio-btn ${isMuted ? 'muted' : ''}`}
        onClick={() => {
          setIsMuted(!isMuted);
          if (!isMuted) stopSpeech();
        }}
        title={isMuted ? t.unmuteAudio : t.muteAudio}
      >
        {isMuted ? <VolumeX /> : <Volume2 />}
      </button>

      {isSpeaking && (
        <button
          className="audio-btn stop"
          onClick={stopSpeech}
          title={t.stopSpeech}
        >
          <Square />
        </button>
      )}
    </div>
  );

  const EmergencyActions = () => {
    useEffect(() => {
      speakText(`${t.emergencyContacts}. ${t.callFamily}. ${t.callAmbulance}. ${t.virtualDoctor}.`, selectedLanguage);
    }, []);

    return (
      <div className="emergency-screen">
        <div className="screen-header">
          <button className="back-btn" onClick={() => setCurrentScreen('menu')}>
            ← {t.backToMenu}
          </button>
          <h2>{t.emergency}</h2>
        </div>

        <div className="emergency-container">
          <div className="emergency-warning">
            <AlertTriangle className="warning-icon" />
            <p>In case of emergency, contact immediately</p>
          </div>

          <div className="emergency-buttons">
            <a href="tel:+919876543210" className="emergency-btn family">
              <Phone className="emergency-icon" />
              <div>
                <h3>{t.callFamily}</h3>
                <p>Call emergency contact</p>
              </div>
            </a>

            <a href="tel:108" className="emergency-btn ambulance">
              <Ambulance className="emergency-icon" />
              <div>
                <h3>{t.callAmbulance}</h3>
                <p>Call 108</p>
              </div>
            </a>

            <a href="tel:+911234567890" className="emergency-btn doctor">
              <Video className="emergency-icon" />
              <div>
                <h3>{t.virtualDoctor}</h3>
                <p>Video consultation</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  };


  const scheduleBrowserNotification = (reminder) => {
  if (!("Notification" in window)) return;

  Notification.requestPermission().then(permission => {
    if (permission !== "granted") return;

    const now = new Date();
    const [hours, minutes] = reminder.dosageTime.split(":");

    const reminderTime = new Date();
    reminderTime.setHours(hours);
    reminderTime.setMinutes(minutes);
    reminderTime.setSeconds(0);

    const timeout = reminderTime.getTime() - now.getTime();

    if (timeout > 0) {
      setTimeout(() => {
        new Notification("MedWise Reminder", {
          body: `Time to take ${reminder.medicineName}`,
          icon: "/logo192.png"
        });
      }, timeout);
    }
  });
};

const fetchReminders = async () => {
  if (!token) return;

  try {
    const res = await fetch(`${API_URL}/reminders`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (Array.isArray(data)) {
      setReminders(data);
    } else {
      setReminders([]);
    }

  } catch (err) {
    console.error(err);
  }
};

  const ReminderManager = () => {
  const [reminderForm, setReminderForm] = useState({
    medicineName: '',
    dosageTime: '',
    frequency: 'daily'
  });
  const [showForm, setShowForm] = useState(false);



  const handleAddReminder = async () => {
    if (!reminderForm.medicineName || !reminderForm.dosageTime) return;

    try {
      const res = await fetch(`${API_URL}/reminders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(reminderForm)
      });

      if (res.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        return;
      }

      const result = await res.json();
      if (!result.success) return;

      await fetchReminders();

      scheduleBrowserNotification(reminderForm);

      setReminderForm({ medicineName: '', dosageTime: '', frequency: 'daily' });
      setShowForm(false);

    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteReminder = async (id) => {
  try {
    const res = await fetch(`${API_URL}/reminders/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.status === 401) {
      alert("Session expired. Please login again.");
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      return;
    }

    if (!res.ok) {
      console.log(await res.text());
      return;
    }

    await fetchReminders();

  } catch (err) {
    console.error("Delete failed:", err);
  }
};

    return (
      <div className="reminders-screen">
        <div className="screen-header">
          <button className="back-btn" onClick={() => setCurrentScreen('menu')}>
            ← {t.backToMenu}
          </button>
          <h2>{t.reminders}</h2>
        </div>

        <div className="reminders-container">
          <button
            className="add-reminder-btn"
            onClick={() => setShowForm(!showForm)}
          >
            <Bell /> {t.setReminder}
          </button>

          {showForm && (
            <div className="reminder-form">
              <input
                type="text"
                placeholder={t.medicineName}
                value={reminderForm.medicineName}
                onChange={(e) => setReminderForm({ ...reminderForm, medicineName: e.target.value })}
                className="form-input"
              />

              <input
                type="time"
                value={reminderForm.dosageTime}
                onChange={(e) => setReminderForm({ ...reminderForm, dosageTime: e.target.value })}
                className="form-input"
              />

              <select
                value={reminderForm.frequency}
                onChange={(e) => setReminderForm({ ...reminderForm, frequency: e.target.value })}
                className="form-select"
              >
                <option value="daily">{t.daily}</option>
                <option value="twice-daily">{t.twiceDaily}</option>
                <option value="weekly">{t.weekly}</option>
              </select>

              <button className="primary-btn" onClick={handleAddReminder}>
                {t.saveReminder}
              </button>
            </div>
          )}

          <div className="reminders-list">
            <h3>{t.yourReminders}</h3>
            {reminders.length === 0 ? (
              <p className="no-reminders">{t.noReminders}</p>
            ) : (
              Array.isArray(reminders) &&
reminders.map(reminder => (
                <div key={reminder.id} className="reminder-item">
                  <div className="reminder-info">
                    <Bell className="reminder-icon" />
                    <div>
                      <h4>{reminder.medicineName}</h4>
                      <p>{reminder.dosageTime} - {reminder.frequency}</p>
                    </div>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteReminder(reminder.id)}
                  >
                    <X />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  const HelpSupport = () => {
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
      if (message.trim()) {
        setSubmitted(true);
        speakText(t.thankYou, selectedLanguage);
        setTimeout(() => {
          setSubmitted(false);
          setMessage('');
        }, 3000);
      }
    };

    return (
      <div className="help-screen">
        <div className="screen-header">
          <button className="back-btn" onClick={() => setCurrentScreen('menu')}>
            ← {t.backToMenu}
          </button>
          <h2>{t.helpSupport}</h2>
        </div>

        <div className="help-container">
          {submitted ? (
            <div className="success-message">
              <CheckCircle className="success-icon" />
              <p>{t.thankYou}</p>
            </div>
          ) : (
            <>
              <div className="help-options">
                <button className="help-option">
                  <AlertTriangle /> {t.reportIssue}
                </button>
                <button className="help-option">
                  <HelpCircle /> {t.requestGuidance}
                </button>
              </div>

              <textarea
                className="help-textarea"
                placeholder={t.yourMessage}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
              />

              <button className="primary-btn" onClick={handleSubmit}>
                {t.submit}
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="medwise-app">
      {!isAuthenticated ? (
  authScreen === "login" ? (
    <LoginScreen switchToRegister={() => setAuthScreen("register")} />
  ) : (
    <RegisterScreen switchToLogin={() => setAuthScreen("login")} />
  )
) : (
        <>
          {currentScreen === 'language' && <LanguageSelector />}
          {currentScreen === 'menu' && <MainMenu />}
          {currentScreen === 'camera' && <CameraCapture />}
          {currentScreen === 'upload' && <ImageUploader />}
          {currentScreen === 'text' && <TextInputSearch />}
          {currentScreen === 'voice' && <VoiceInput />}
          {currentScreen === 'result' && <MedicineResultCard />}
          {currentScreen === 'emergency' && <EmergencyActions />}
          {currentScreen === 'reminders' && <ReminderManager />}
          {currentScreen === 'help' && <HelpSupport />}
        </>
      )}
      <style >{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .medwise-app {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
          color: #1a1a2e;
        }

        .language-selector-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .language-container {
          background: white;
          border-radius: 24px;
          padding: 3rem 2rem;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }

        .logo-section {
          text-align: center;
          margin-bottom: 3rem;
        }

        .logo-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-icon .heart-pulse {
          width: 48px;
          height: 48px;
          color: white;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .app-title {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }

        .app-subtitle {
          font-size: 1.1rem;
          color: #666;
        }

        .select-language-title {
          font-size: 1.2rem;
          font-weight: 600;
          text-align: center;
          margin-bottom: 1.5rem;
          color: #333;
        }

        .language-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .language-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          background: #f8f9fa;
          border: 2px solid #e9ecef;
          border-radius: 16px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .language-btn:hover {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(102,126,234,0.3);
        }

        .lang-flag { font-size: 2rem; }
        .lang-name { flex: 1; text-align: left; margin-left: 1rem; }

        .main-menu-screen { min-height: 100vh; padding-bottom: 80px; }

        .app-header {
          background: white;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .menu-toggle {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
        }

        .header-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .header-icon {
          width: 32px;
          height: 32px;
          color: #667eea;
        }

        .header-title h1 {
          font-size: 1.5rem;
          font-weight: 800;
          color: #1a1a2e;
        }

        .header-title p {
          font-size: 0.85rem;
          color: #666;
        }

        .lang-switch {
          background: #f8f9fa;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        .side-menu {
          position: fixed;
          top: 80px;
          left: -300px;
          width: 280px;
          background: white;
          height: calc(100vh - 80px);
          box-shadow: 4px 0 12px rgba(0,0,0,0.1);
          transition: left 0.3s ease;
          z-index: 99;
          padding: 1rem;
        }

        .side-menu.open { left: 0; }

        .side-menu-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: #f8f9fa;
          border: none;
          border-radius: 12px;
          margin-bottom: 0.75rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
          transition: all 0.3s ease;
        }

        .side-menu-item:hover {
          background: #667eea;
          color: white;
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .menu-card {
          background: white;
          border: none;
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .menu-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.15);
        }

        .menu-card.primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .menu-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 1rem;
          color: #667eea;
        }

        .menu-card.primary .menu-icon { color: white; }

        .menu-card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .menu-card p {
          font-size: 0.95rem;
          opacity: 0.8;
        }

        .screen-header {
          background: white;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .back-btn {
          background: none;
          border: none;
          font-size: 1rem;
          font-weight: 600;
          color: #667eea;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .screen-header h2 {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .camera-screen { min-height: 100vh; }

        .camera-container {
          padding: 2rem;
          max-width: 600px;
          margin: 0 auto;
          position: relative;
        }

        .camera-video {
          width: 100%;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }

        .camera-overlay {
          position: absolute;
          top: 2rem;
          left: 2rem;
          right: 2rem;
          bottom: 6rem;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .scan-frame {
          width: 80%;
          height: 60%;
          border: 3px dashed white;
          border-radius: 16px;
        }

        .capture-btn {
          position: absolute;
          bottom: 4rem;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          border: none;
          padding: 1.5rem 3rem;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 700;
          color: #667eea;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }

        .captured-image, .uploaded-image {
          width: 100%;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
          margin-bottom: 1.5rem;
        }

        .capture-actions, .upload-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .primary-btn, .secondary-btn {
          padding: 1rem 2rem;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .primary-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(102,126,234,0.3);
        }

        .primary-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .secondary-btn {
          background: white;
          color: #667eea;
          border: 2px solid #667eea;
        }

        .secondary-btn:hover {
          background: #667eea;
          color: white;
        }

        .upload-screen { min-height: 100vh; }

        .upload-container {
          padding: 2rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .upload-zone {
          width: 100%;
          min-height: 400px;
          background: white;
          border: 3px dashed #667eea;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .upload-zone:hover {
          background: #f8f9fa;
          border-color: #764ba2;
        }

        .upload-icon {
          width: 80px;
          height: 80px;
          color: #667eea;
          margin-bottom: 1rem;
        }

        .upload-zone p {
          font-size: 1.2rem;
          font-weight: 600;
          color: #333;
        }

        .upload-hint {
          font-size: 0.9rem !important;
          color: #666 !important;
          margin-top: 0.5rem;
        }

        .text-search-screen { min-height: 100vh; }

        .search-container {
          padding: 2rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .search-input-group {
          display: flex;
          align-items: center;
          background: white;
          border-radius: 12px;
          padding: 0 1rem;
          margin-bottom: 1rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .search-icon {
          color: #667eea;
          margin-right: 0.75rem;
        }

        .search-input {
          flex: 1;
          border: none;
          padding: 1.25rem 0;
          font-size: 1.1rem;
          outline: none;
        }

        .search-btn { width: 100%; }

        .search-suggestions {
          margin-top: 2rem;
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .suggestions-title {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 1rem;
        }

        .suggestion-chip {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          margin-right: 0.5rem;
          margin-bottom: 0.5rem;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .suggestion-chip:hover {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .voice-search-screen { min-height: 100vh; }

        .voice-container {
          padding: 2rem;
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }

        .voice-btn {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 2rem auto;
          transition: all 0.3s ease;
          box-shadow: 0 8px 24px rgba(102,126,234,0.3);
        }

        .voice-btn:hover {
          transform: scale(1.05);
        }

        .voice-btn.listening {
          animation: pulse-ring 1.5s infinite;
        }

        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 rgba(102,126,234,0.7);
          }
          70% {
            box-shadow: 0 0 0 30px rgba(102,126,234,0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(102,126,234,0);
          }
        }

        .voice-icon {
          width: 64px;
          height: 64px;
          color: white;
        }

        .voice-status {
          font-size: 1.2rem;
          font-weight: 600;
          color: white;
          margin-bottom: 2rem;
        }

        .transcript {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          margin-top: 2rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .transcript-label {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 0.5rem;
        }

        .transcript-text {
          font-size: 1.2rem;
          font-weight: 600;
          color: #333;
        }

        .result-screen { min-height: 100vh; padding-bottom: 100px; }

        .medicine-card {
          background: white;
          margin: 2rem;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        }

        .medicine-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 2px solid #f8f9fa;
        }

        .medicine-image {
          width: 120px;
          height: 120px;
          border-radius: 12px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .medicine-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .medicine-title h3 {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 0.25rem;
        }

        .generic-name {
          font-size: 1rem;
          color: #666;
        }

        .medicine-sections {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .info-section {
          padding: 1.5rem;
          background: #f8f9fa;
          border-radius: 12px;
          border-left: 4px solid #667eea;
        }

        .info-section.warning-section {
          background: #fff3cd;
          border-left-color: #ffc107;
        }

        .info-section h4 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: #333;
        }

        .info-section p {
          font-size: 1rem;
          line-height: 1.6;
          color: #555;
        }

        .audio-controls {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          display: flex;
          gap: 1rem;
          z-index: 100;
        }

        .audio-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
        }

        .audio-btn:hover { transform: scale(1.1); }
        .audio-btn.muted { background: #dc3545; color: white; }
        .audio-btn.stop { background: #ffc107; }

        .emergency-screen { min-height: 100vh; }

        .emergency-container {
          padding: 2rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .emergency-warning {
          background: #fff3cd;
          padding: 1.5rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          border-left: 4px solid #ffc107;
        }

        .warning-icon {
          width: 32px;
          height: 32px;
          color: #ffc107;
        }

        .emergency-buttons {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .emergency-btn {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.5rem;
          background: white;
          border: none;
          border-radius: 16px;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }

        .emergency-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }

        .emergency-icon {
          width: 48px;
          height: 48px;
          color: white;
          padding: 0.75rem;
          border-radius: 12px;
        }

        .emergency-btn.family .emergency-icon { background: #28a745; }
        .emergency-btn.ambulance .emergency-icon { background: #dc3545; }
        .emergency-btn.doctor .emergency-icon { background: #007bff; }

        .emergency-btn h3 {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .emergency-btn p {
          font-size: 0.95rem;
          color: #666;
        }

        .reminders-screen { min-height: 100vh; }

        .reminders-container {
          padding: 2rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .add-reminder-btn {
          width: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 1.25rem;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
          transition: all 0.3s ease;
        }

        .add-reminder-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(102,126,234,0.3);
        }

        .reminder-form {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          margin-bottom: 2rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .form-input, .form-select {
          width: 100%;
          padding: 1rem;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-size: 1rem;
          margin-bottom: 1rem;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .form-input:focus, .form-select:focus {
          border-color: #667eea;
        }

        .reminders-list {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .reminders-list h3 {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .no-reminders {
          text-align: center;
          color: #666;
          padding: 2rem;
        }

        .reminder-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem;
          background: #f8f9fa;
          border-radius: 12px;
          margin-bottom: 1rem;
        }

        .reminder-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .reminder-icon {
          width: 32px;
          height: 32px;
          color: #667eea;
        }

        .reminder-item h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .reminder-item p {
          font-size: 0.9rem;
          color: #666;
        }

        .delete-btn {
          background: #dc3545;
          color: white;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .help-screen { min-height: 100vh; }

        .help-container {
          padding: 2rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .help-options {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .help-option {
          flex: 1;
          padding: 1.25rem;
          background: white;
          border: 2px solid #e9ecef;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .help-option:hover {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .help-textarea {
          width: 100%;
          padding: 1.25rem;
          border: 2px solid #e9ecef;
          border-radius: 12px;
          font-size: 1rem;
          font-family: inherit;
          margin-bottom: 1rem;
          outline: none;
          resize: vertical;
          transition: border-color 0.3s ease;
        }

        .help-textarea:focus {
          border-color: #667eea;
        }

        .success-message {
          background: white;
          padding: 3rem 2rem;
          border-radius: 16px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .success-icon {
          width: 64px;
          height: 64px;
          color: #28a745;
          margin: 0 auto 1rem;
        }

        .success-message p {
          font-size: 1.2rem;
          font-weight: 600;
          color: #333;
        }

        .error-message {
          background: #f8d7da;
          color: #721c24;
          padding: 1rem;
          border-radius: 8px;
          margin-top: 1rem;
          text-align: center;
          border-left: 4px solid #dc3545;
        }

        .loading-spinner {
          width: 48px;
          height: 48px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 2rem auto;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .menu-grid {
            grid-template-columns: 1fr;
            padding: 1rem;
          }

          .language-container {
            padding: 2rem 1.5rem;
          }

          .app-title {
            font-size: 2rem;
          }

          .medicine-card {
            margin: 1rem;
            padding: 1.5rem;
          }

          .medicine-header {
            flex-direction: column;
            text-align: center;
          }

          .audio-controls {
            bottom: 1rem;
            right: 1rem;
          }

          .camera-container, .upload-container, .search-container,
          .voice-container, .emergency-container, .reminders-container,
          .help-container {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}