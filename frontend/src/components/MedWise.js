 /* global webkitSpeechRecognition */

// import React, { useState, useEffect, useRef } from 'react';
// import { Camera, Mic, Type, Upload, Volume2, VolumeX } from 'lucide-react';

// const MedScanner = () => {
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
//       welcome: "Welcome to MedScanner. Please select an input method.",
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
//       welcome: "ಮೆಡ್‌ಸ್ಕ್ಯಾನರ್‌ಗೆ ಸ್ವಾಗತ. ದಯವಿಟ್ಟು ಇನ್‌ಪುಟ್ ವಿಧಾನವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
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
//       welcome: "मेडस्कैनर में आपका स्वागत है। कृपया इनपुट विधि चुनें।",
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
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = languageCodes[lang] || 'en-US';
//     utterance.rate = 0.9;
//     utterance.pitch = 1;
    
//     utterance.onstart = () => setIsSpeaking(true);
//     utterance.onend = () => setIsSpeaking(false);
    
//     window.speechSynthesis.speak(utterance);
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
//       const API_URL = 'http://localhost:5000';
      
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
//             <h1 className="text-3xl font-bold text-indigo-600">💊 MedScanner</h1>
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

// export default MedScanner




import React, { useState, useEffect, useRef } from 'react';
import { Camera, Mic, Type, Upload, Volume2, VolumeX } from 'lucide-react';




const MedWise = () => {
  const [stage, setStage] = useState('language');
  const [language, setLanguage] = useState('');
  const [inputMode, setInputMode] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [result, setResult] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const languageLoopRef = useRef(null);

  const texts = {
    english: {
      languagePrompt: "Press 1 for English, Press 2 for Kannada, Press 3 for Hindi",
      welcome: "Welcome to MedWise. Please select an input method.",
      options: "Press 1 for Image Upload, Press 2 to Type Medicine Name, Press 3 for Voice Input",
      imageOption: "Image Upload",
      typeOption: "Type Medicine Name",
      voiceOption: "Voice Input",
      processing: "Processing your medicine...",
      result: "Medicine Information",
      uploadOrCapture: "Upload or Capture Medicine Image",
      upload: "Upload Image",
      capture: "Capture Photo",
      enterName: "Enter Medicine Name",
      submit: "Submit",
      startVoice: "Start Speaking",
      stopVoice: "Stop Recording",
      backToMenu: "Back to Menu",
      changeLanguage: "Change Language",
      noResult: "Medicine not found in database"
    },
    kannada: {
      languagePrompt: "ಇಂಗ್ಲಿಷ್‌ಗೆ 1 ಒತ್ತಿ, ಕನ್ನಡಕ್ಕೆ 2 ಒತ್ತಿ, ಹಿಂದಿಗೆ 3 ಒತ್ತಿ",
      welcome: "ಮೆಡ್ ವೈಸ್ ಗೆ ಸ್ವಾಗತ. ದಯವಿಟ್ಟು ಇನ್‌ಪುಟ್ ವಿಧಾನವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
      options: "ಚಿತ್ರ ಅಪ್‌ಲೋಡ್‌ಗಾಗಿ 1 ಒತ್ತಿ, ಔಷಧದ ಹೆಸರು ಟೈಪ್ ಮಾಡಲು 2 ಒತ್ತಿ, ಧ್ವನಿ ಇನ್‌ಪುಟ್‌ಗಾಗಿ 3 ಒತ್ತಿ",
      imageOption: "ಚಿತ್ರ ಅಪ್‌ಲೋಡ್",
      typeOption: "ಔಷಧದ ಹೆಸರು ಟೈಪ್ ಮಾಡಿ",
      voiceOption: "ಧ್ವನಿ ಇನ್‌ಪುಟ್",
      processing: "ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತಿದೆ...",
      result: "ಔಷಧ ಮಾಹಿತಿ",
      uploadOrCapture: "ಔಷಧದ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಸೆರೆಹಿಡಿಯಿರಿ",
      upload: "ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
      capture: "ಫೋಟೋ ತೆಗೆಯಿರಿ",
      enterName: "ಔಷಧದ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
      submit: "ಸಲ್ಲಿಸು",
      startVoice: "ಮಾತನಾಡಲು ಪ್ರಾರಂಭಿಸಿ",
      stopVoice: "ರೆಕಾರ್ಡಿಂಗ್ ನಿಲ್ಲಿಸಿ",
      backToMenu: "ಮೆನುಗೆ ಹಿಂತಿರುಗಿ",
      changeLanguage: "ಭಾಷೆ ಬದಲಿಸಿ",
      noResult: "ಔಷಧ ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ಕಂಡುಬಂದಿಲ್ಲ"
    },
    hindi: {
      languagePrompt: "अंग्रेजी के लिए 1 दबाएं, कन्नड़ के लिए 2 दबाएं, हिंदी के लिए 3 दबाएं",
      welcome: "मेडवाइज में आपका स्वागत है। कृपया इनपुट विधि चुनें।",
      options: "छवि अपलोड के लिए 1 दबाएं, दवा का नाम टाइप करने के लिए 2 दबाएं, वॉयस इनपुट के लिए 3 दबाएं",
      imageOption: "छवि अपलोड करें",
      typeOption: "दवा का नाम टाइप करें",
      voiceOption: "वॉयस इनपुट",
      processing: "प्रसंस्करण...",
      result: "दवा की जानकारी",
      uploadOrCapture: "दवा की छवि अपलोड या कैप्चर करें",
      upload: "छवि अपलोड करें",
      capture: "फोटो लें",
      enterName: "दवा का नाम दर्ज करें",
      submit: "जमा करें",
      startVoice: "बोलना शुरू करें",
      stopVoice: "रिकॉर्डिंग बंद करें",
      backToMenu: "मेनू पर वापस जाएं",
      changeLanguage: "भाषा बदलें",
      noResult: "दवा डेटाबेस में नहीं मिली"
    }
  };

  const languageCodes = {
    english: 'en-US',
    kannada: 'kn-IN',
    hindi: 'hi-IN'
  };

  // Medicine database from your trained model
  const MEDICINE_DATABASE = {
    'cetrizine': { 
      name: 'Cetrizine (Cetirizine)', 
      uses: 'Antihistamine for allergy relief', 
      dosage: '5-10mg once daily', 
      warnings: 'May cause drowsiness' 
    },
    'emeset-4': { 
      name: 'Emeset-4 (Ondansetron)', 
      uses: 'Prevents nausea and vomiting', 
      dosage: '4-8mg as directed', 
      warnings: 'Take as prescribed by doctor' 
    },
    'paracetamol': { 
      name: 'Paracetamol', 
      uses: 'Pain relief and fever reduction', 
      dosage: '500-1000mg every 4-6 hours', 
      warnings: 'Do not exceed 4000mg/day' 
    }
  };

  useEffect(() => {
  // Force browser to load voices early
  window.speechSynthesis.getVoices();

  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}, []);

  // const speak = (text, lang) => {
  //   if (!audioEnabled || !('speechSynthesis' in window)) return;
    
  //   window.speechSynthesis.cancel();
    
  //   return new Promise((resolve) => {
  //     const utterance = new SpeechSynthesisUtterance(text);
      
  //     // Set language with better voice selection
  //     const langCode = languageCodes[lang] || 'en-US';
  //     utterance.lang = langCode;
  //     utterance.rate = 0.85;
  //     utterance.pitch = 1;
  //     utterance.volume = 1;
      
  //     // Wait for voices to load
  //     const setVoice = () => {
  //       const voices = window.speechSynthesis.getVoices();
        
  //       // Try to find a voice for the language
  //       let voice = voices.find(v => v.lang.startsWith(langCode.split('-')[0]));
        
  //       // Fallback: for Kannada and Hindi, use any available Indian voice or English
  //       if (!voice && (lang === 'kannada' || lang === 'hindi')) {
  //         voice = voices.find(v => v.lang.includes('IN')) || 
  //                 voices.find(v => v.lang.includes('en-IN')) ||
  //                 voices.find(v => v.lang.includes('en-US'));
  //       }
        
  //       if (voice) {
  //         utterance.voice = voice;
  //       }
  //     };
      
  //     // Load voices if not loaded
  //     if (window.speechSynthesis.getVoices().length === 0) {
  //       window.speechSynthesis.onvoiceschanged = () => {
  //         setVoice();
  //       };
  //     } else {
  //       setVoice();
  //     }
      
  //     utterance.onstart = () => setIsSpeaking(true);
  //     utterance.onend = () => {
  //       setIsSpeaking(false);
  //       resolve();
  //     };
  //     utterance.onerror = (e) => {
  //       console.error('Speech error:', e);
  //       setIsSpeaking(false);
  //       resolve();
  //     };
      
  //     // Small delay to ensure voice is set
  //     setTimeout(() => {
  //       window.speechSynthesis.speak(utterance);
  //     }, 100);
  //   });
  // };
  const speak = (text, lang) => {
  if (!audioEnabled || !('speechSynthesis' in window) || !text) return;

  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(text);

    const langCode = languageCodes[lang] || 'en-US';
    utterance.lang = langCode;

    // Slow & clear (medical friendly)
    utterance.rate = 0.6;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const voices = window.speechSynthesis.getVoices();

    let voice =
      voices.find(v => v.lang === langCode) ||
      voices.find(v => v.lang.startsWith(langCode.split('-')[0])) ||
      voices.find(v => v.lang.includes('IN')) ||
      voices.find(v => v.lang.includes('en'));

    if (voice) utterance.voice = voice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      resolve();
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      resolve();
    };

    window.speechSynthesis.speak(utterance);
  });
};


  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const playLanguageLoop = () => {
    const languages = ['english', 'kannada', 'hindi'];
    let index = 0;

    const playNext = () => {
      if (stage !== 'language') return;
      
      const lang = languages[index];
      speak(texts[lang].languagePrompt, lang);
      
      index = (index + 1) % 3;
      languageLoopRef.current = setTimeout(playNext, 5000);
    };

    playNext();
  };

  useEffect(() => {
    if (stage === 'language') {
      playLanguageLoop();
    }

    return () => {
      if (languageLoopRef.current) {
        clearTimeout(languageLoopRef.current);
      }
      stopSpeaking();
    };
  }, [stage, audioEnabled]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (stage === 'language') {
        if (e.key === '1') {
          stopSpeaking();
          if (languageLoopRef.current) clearTimeout(languageLoopRef.current);
          setLanguage('english');
          setStage('menu');
          setTimeout(() => speak(texts.english.welcome + " " + texts.english.options, 'english'), 100);
        } else if (e.key === '2') {
          stopSpeaking();
          if (languageLoopRef.current) clearTimeout(languageLoopRef.current);
          setLanguage('kannada');
          setStage('menu');
          setTimeout(() => speak(texts.kannada.welcome + " " + texts.kannada.options, 'kannada'), 100);
        } else if (e.key === '3') {
          stopSpeaking();
          if (languageLoopRef.current) clearTimeout(languageLoopRef.current);
          setLanguage('hindi');
          setStage('menu');
          setTimeout(() => speak(texts.hindi.welcome + " " + texts.hindi.options, 'hindi'), 100);
        }
      } else if (stage === 'menu') {
        if (e.key === '1') {
          setInputMode('image');
          setStage('input');
        } else if (e.key === '2') {
          setInputMode('type');
          setStage('input');
        } else if (e.key === '3') {
          setInputMode('voice');
          setStage('input');
          startVoiceRecognition();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [stage, language]);

  const preprocessImage = (imageData) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 224;
        canvas.height = 224;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, 224, 224);
        resolve(canvas.toDataURL('image/jpeg'));
      };
      img.src = imageData;
    });
  };

  const predictMedicine = async (imageData) => {
    try {
      // Preprocess image
      const processedImage = await preprocessImage(imageData);
      
      // Local API endpoint
      // const API_URL = ' http://localhost:5000';
      const API_URL = 'https://medwise-kf10.onrender.com/';
      
      const formData = new FormData();
      const blob = await fetch(processedImage).then(r => r.blob());
      formData.append('image', blob, 'medicine.jpg');

      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('API call failed');
      }

      const data = await response.json();
      
      // Expected response format: { success: true, medicine_info: {...} }
      if (data.success && data.medicine_info) {
        return data.medicine_info;
      }
      
      return null;
    } catch (error) {
      console.error('Prediction error:', error);
      // Fallback to mock prediction for demo
      return mockPrediction();
    }
  };

  const mockPrediction = () => {
    // For demo purposes - randomly select a medicine
    const medicines = Object.keys(MEDICINE_DATABASE);
    const randomMed = medicines[Math.floor(Math.random() * medicines.length)];
    return MEDICINE_DATABASE[randomMed];
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        processImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment', width: 1280, height: 720 } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      alert('Camera access denied');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg');
      setImagePreview(imageData);
      
      const stream = video.srcObject;
      stream.getTracks().forEach(track => track.stop());
      setCameraActive(false);
      
      processImage(imageData);
    }
  };

  const processImage = async (imageData) => {
    setIsProcessing(true);
    speak(texts[language].processing, language);
    
    try {
      // Call your trained model
      const medicineInfo = await predictMedicine(imageData);
      
      if (medicineInfo) {
        setResult(medicineInfo);
        setStage('result');
        
        const resultText = `Medicine identified: ${medicineInfo.name}. Used for ${medicineInfo.uses}. ${medicineInfo.dosage}`;
        speak(resultText, language);
      } else {
        setResult({ name: texts[language].noResult, uses: '', dosage: '', warnings: '' });
        setStage('result');
        speak(texts[language].noResult, language);
      }
    } catch (error) {
      console.error('Processing error:', error);
      setResult({ name: 'Error processing image', uses: '', dosage: '', warnings: '' });
      setStage('result');
    } finally {
      setIsProcessing(false);
    }
  };

  const processText = async () => {
    if (!textInput.trim()) return;
    
    setIsProcessing(true);
    speak(texts[language].processing, language);
    
    const searchTerm = textInput.toLowerCase().trim();
    const medicineInfo = MEDICINE_DATABASE[searchTerm];
    
    setTimeout(() => {
      if (medicineInfo) {
        setResult(medicineInfo);
        setStage('result');
        
        const resultText = `Information for ${medicineInfo.name}: ${medicineInfo.uses}. ${medicineInfo.dosage}`;
        speak(resultText, language);
      } else {
        setResult({ name: texts[language].noResult, uses: '', dosage: '', warnings: '' });
        setStage('result');
        speak(texts[language].noResult, language);
      }
      setIsProcessing(false);
    }, 1000);
  };

  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice recognition not supported');
      return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = languageCodes[language];

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTextInput(transcript);
      setIsListening(false);
      
      setTimeout(() => {
        const searchTerm = transcript.toLowerCase().trim();
        const medicineInfo = MEDICINE_DATABASE[searchTerm];
        
        setIsProcessing(true);
        speak(texts[language].processing, language);
        
        setTimeout(() => {
          if (medicineInfo) {
            setResult(medicineInfo);
            setStage('result');
            
            const resultText = `You said ${transcript}. Medicine: ${medicineInfo.name}. ${medicineInfo.uses}`;
            speak(resultText, language);
          } else {
            setResult({ name: texts[language].noResult, uses: '', dosage: '', warnings: '' });
            setStage('result');
            speak(texts[language].noResult, language);
          }
          setIsProcessing(false);
        }, 1500);
      }, 500);
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert('Voice recognition error');
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const resetApp = () => {
    stopSpeaking();
    setStage('menu');
    setInputMode('');
    setResult(null);
    setImagePreview(null);
    setTextInput('');
    setCameraActive(false);
    setTimeout(() => speak(texts[language].options, language), 100);
  };

  const changeLanguage = () => {
    stopSpeaking();
    setStage('language');
    setLanguage('');
    setInputMode('');
    setResult(null);
    setImagePreview(null);
    setTextInput('');
    setCameraActive(false);
  };

  const t = language ? texts[language] : texts.english;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-indigo-600">💊 Medwise- Know Your Medicine</h1>
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition"
            >
              {audioEnabled ? <Volume2 className="w-6 h-6 text-indigo-600" /> : <VolumeX className="w-6 h-6 text-gray-400" />}
            </button>
          </div>
        </div>

        {/* Language Selection */}
        {stage === 'language' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-center mb-6">Select Language / ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ / भाषा चुनें</h2>
            <div className="space-y-4">
              <button
                onClick={() => {
                  stopSpeaking();
                  if (languageLoopRef.current) clearTimeout(languageLoopRef.current);
                  setLanguage('english');
                  setStage('menu');
                  setTimeout(() => speak(texts.english.welcome + " " + texts.english.options, 'english'), 100);
                }}
                className="w-full p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-lg font-semibold transition transform hover:scale-105"
              >
                1 - English
              </button>
              <button
                onClick={() => {
                  stopSpeaking();
                  if (languageLoopRef.current) clearTimeout(languageLoopRef.current);
                  setLanguage('kannada');
                  setStage('menu');
                  setTimeout(() => speak(texts.kannada.welcome + " " + texts.kannada.options, 'kannada'), 100);
                }}
                className="w-full p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-lg font-semibold transition transform hover:scale-105"
              >
                2 - ಕನ್ನಡ (Kannada)
              </button>
              <button
                onClick={() => {
                  stopSpeaking();
                  if (languageLoopRef.current) clearTimeout(languageLoopRef.current);
                  setLanguage('hindi');
                  setStage('menu');
                  setTimeout(() => speak(texts.hindi.welcome + " " + texts.hindi.options, 'hindi'), 100);
                }}
                className="w-full p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-lg font-semibold transition transform hover:scale-105"
              >
                3 - हिंदी (Hindi)
              </button>
            </div>
            {isSpeaking && (
              <div className="mt-6 text-center">
                <div className="inline-block animate-pulse text-indigo-600 text-lg">
                  🔊 Playing instructions...
                </div>
              </div>
            )}
          </div>
        )}

        {/* Menu */}
        {stage === 'menu' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-center mb-6">{t.welcome}</h2>
            <div className="space-y-4">
              <button
                onClick={() => {
                  setInputMode('image');
                  setStage('input');
                }}
                className="w-full p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-3 text-lg font-semibold transition transform hover:scale-105"
              >
                <Camera className="w-6 h-6" />
                1 - {t.imageOption}
              </button>
              <button
                onClick={() => {
                  setInputMode('type');
                  setStage('input');
                }}
                className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-3 text-lg font-semibold transition transform hover:scale-105"
              >
                <Type className="w-6 h-6" />
                2 - {t.typeOption}
              </button>
              <button
                onClick={() => {
                  setInputMode('voice');
                  setStage('input');
                  setTimeout(startVoiceRecognition, 500);
                }}
                className="w-full p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-3 text-lg font-semibold transition transform hover:scale-105"
              >
                <Mic className="w-6 h-6" />
                3 - {t.voiceOption}
              </button>
            </div>
            <button
              onClick={changeLanguage}
              className="w-full mt-6 p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              {t.changeLanguage}
            </button>
          </div>
        )}

        {/* Input Stage */}
        {stage === 'input' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            {inputMode === 'image' && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">{t.uploadOrCapture}</h2>
                
                {!cameraActive && !imagePreview && (
                  <div className="space-y-4">
                    <label className="block">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="imageUpload"
                      />
                      <div className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition">
                        <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                        <span className="text-lg">{t.upload}</span>
                      </div>
                    </label>
                    <button
                      onClick={startCamera}
                      className="w-full p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 transition"
                    >
                      <Camera className="w-6 h-6" />
                      {t.capture}
                    </button>
                  </div>
                )}

                {cameraActive && (
                  <div className="space-y-4">
                    <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg shadow-md" />
                    <button
                      onClick={capturePhoto}
                      className="w-full p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      📸 Capture Photo
                    </button>
                  </div>
                )}

                {imagePreview && (
                  <div className="space-y-4">
                    <img src={imagePreview} alt="Preview" className="w-full rounded-lg shadow-md" />
                    {isProcessing && (
                      <div className="text-center py-4">
                        <div className="animate-spin w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto"></div>
                        <p className="mt-4 text-lg">{t.processing}</p>
                      </div>
                    )}
                  </div>
                )}

                <canvas ref={canvasRef} className="hidden" />
              </div>
            )}

            {inputMode === 'type' && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">{t.typeOption}</h2>
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder={t.enterName}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg mb-4 text-lg focus:border-indigo-500 focus:outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && processText()}
                />
                <button
                  onClick={processText}
                  disabled={!textInput.trim() || isProcessing}
                  className="w-full p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                >
                  {isProcessing ? t.processing : t.submit}
                </button>
              </div>
            )}

            {inputMode === 'voice' && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">{t.voiceOption}</h2>
                <div className="text-center py-8">
                  {isListening ? (
                    <div>
                      <div className="w-24 h-24 mx-auto mb-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                        <Mic className="w-12 h-12 text-white" />
                      </div>
                      <p className="text-xl mb-4">Listening...</p>
                      <button
                        onClick={stopVoiceRecognition}
                        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      >
                        {t.stopVoice}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={startVoiceRecognition}
                      className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-lg transition transform hover:scale-105"
                    >
                      <Mic className="w-6 h-6 inline mr-2" />
                      {t.startVoice}
                    </button>
                  )}
                  {textInput && (
                    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                      <p className="text-lg">"{textInput}"</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!isProcessing && (
              <button
                onClick={resetApp}
                className="w-full mt-6 p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                {t.backToMenu}
              </button>
            )}
          </div>
        )}

        {/* Result Stage */}
        {stage === 'result' && result && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-indigo-600 mb-6">{t.result}</h2>
            <div className="space-y-4">
              <div className="border-b pb-3">
                <h3 className="font-semibold text-gray-600">Medicine Name:</h3>
                <p className="text-xl font-bold">{result.name}</p>
              </div>
              {result.uses && (
                <div className="border-b pb-3">
                  <h3 className="font-semibold text-gray-600">Uses:</h3>
                  <p>{result.uses}</p>
                </div>
              )}
              {result.dosage && (
                <div className="border-b pb-3">
                  <h3 className="font-semibold text-gray-600">Dosage:</h3>
                  <p>{result.dosage}</p>
                </div>
              )}
              {result.warnings && (
                <div className="pb-3">
                  <h3 className="font-semibold text-gray-600">Warnings:</h3>
                  <p className="text-red-600 font-semibold">{result.warnings}</p>
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={resetApp}
                className="flex-1 p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                {t.backToMenu}
              </button>
              <button
                onClick={changeLanguage}
                className="flex-1 p-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                {t.changeLanguage}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedWise