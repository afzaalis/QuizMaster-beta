import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

// Types
type Question = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers: string[];
};

type Answer = {
  question: string;
  answer: string;
  correct: string;
};

type Result = {
  correct: number;
  wrong: number;
  total: number;
};

const App = () => {
  // 1a. Fitur login: simpan username dan status login
  const [username, setUsername] = useState<string>(""); 
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // 1b. API soal dari opentdb
  const [questions, setQuestions] = useState<Question[]>([]);

  // 1d & 1f. Index soal untuk tampilkan satu per satu & progress soal
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Menyimpan jawaban user
  const [answers, setAnswers] = useState<Answer[]>([]);

  // 1e & 1g. Timer untuk kuis, dengan batas waktu pengerjaan
  const [timer, setTimer] = useState<number>(60);

  // Menyimpan hasil akhir kuis
  const [result, setResult] = useState<Result | null>(null);

  // 1h. Load state dari localStorage untuk resume kuis
  useEffect(() => {
    const saved = localStorage.getItem("quizState");
    if (saved) {
      const state = JSON.parse(saved);
      setUsername(state.username);
      setIsLoggedIn(true);
      setQuestions(state.questions);
      setCurrentIndex(state.currentIndex);
      setAnswers(state.answers);
      setTimer(state.timer);
    }
  }, []);

  // 1e. Timer countdown berjalan tiap detik, dan cek jika timer habis
  useEffect(() => {
    if (isLoggedIn && questions.length > 0 && timer > 0 && !result) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !result) {
      finishQuiz();
    }
  }, [timer, isLoggedIn, questions, result]);

  // 1h. Simpan state ke localStorage setiap kali ada perubahan (resume)
  useEffect(() => {
    if (isLoggedIn && questions.length > 0) {
      localStorage.setItem("quizState", JSON.stringify({
        username,
        questions,
        currentIndex,
        answers,
        timer
      }));
    }
  }, [username, questions, currentIndex, answers, timer, isLoggedIn]);

  // 1a & 1b. Fungsi login: ambil soal dari API dan mulai kuis
  const login = async () => {
    const res = await axios.get("https://opentdb.com/api.php?amount=5&type=multiple");
    const formatted: Question[] = res.data.results.map((q: any) => ({
      ...q,
      answers: shuffle([...q.incorrect_answers, q.correct_answer]) // acak jawaban
    }));
    setQuestions(formatted);
    setIsLoggedIn(true);
    setTimer(60); 
  };

  // Fungsi untuk mengacak array (jawaban)
  const shuffle = (arr: string[]): string[] => arr.sort(() => Math.random() - 0.5);

  // 1f. Saat user pilih jawaban, langsung simpan & pindah ke soal berikutnya
  const selectAnswer = (answer: string) => {
    const correct = questions[currentIndex].correct_answer;
    const newAnswers = [...answers, {
      question: questions[currentIndex].question,
      answer,
      correct
    }];
    setAnswers(newAnswers);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishQuiz(newAnswers);
    }
  };

  // Reset quiz dan kembali ke halaman login/dashboard
  const resetQuiz = () => {
    setIsLoggedIn(false);
    setUsername("");
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers([]);
    setTimer(60);
    setResult(null);
    localStorage.removeItem("quizState");
  };

  // 1g. Hitung hasil kuis (benar, salah, total) & hapus data localStorage
  const finishQuiz = (finalAnswers: Answer[] = answers) => {
    const correct = finalAnswers.filter(a => a.answer === a.correct).length;
    const total = finalAnswers.length;
    setResult({ correct, wrong: total - correct, total });
    localStorage.removeItem("quizState");
  };

  // Render login page (1a)
  if (!isLoggedIn) {
    return (
      <div className="container">
        <h1>Welcome to Quiz Master Beta</h1>
        <input
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <button onClick={login} disabled={!username.trim()}>Start Quiz</button>
      </div>
    );
  }

  // Render hasil kuis (1g & 1d)
  if (result) {
    return (
      <div className="container result">
        <h2>Quiz Completed</h2>
        <p>Correct: <strong>{result.correct}</strong></p>
        <p>Wrong: <strong>{result.wrong}</strong></p>
        <p>Total Answered: <strong>{result.total}</strong></p>
        {/* 1a & tambahan tombol untuk kembali ke dashboard */}
        <button onClick={resetQuiz} style={{marginTop: '20px'}}>Back to Dashboard</button>
      </div>
    );
  }

  // Tampilkan loading jika soal belum siap
  if (questions.length === 0) return <p className="container" style={{textAlign:"center"}}>Loading questions...</p>;

  // Soal sekarang (1d & 1f)
  const q = questions[currentIndex];

  return (
    <div className="container">
      {/* 1a, 1e - Status bar dengan nama user dan timer */}
      <div className="status-bar">
        <span>User: <strong>{username}</strong></span>
        <span>Time Left: <strong>{timer}s</strong></span>
      </div>
      {/* 1f - tampilkan soal satu per satu */}
      <div className="question" dangerouslySetInnerHTML={{ __html: q.question }} />
      <div>
        {/* 1f - pilihan jawaban */}
        {q.answers.map((ans, idx) => (
          <button
            key={idx}
            className="answer-button"
            onClick={() => selectAnswer(ans)}
            dangerouslySetInnerHTML={{ __html: ans }}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
