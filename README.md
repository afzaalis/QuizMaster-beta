Frontend React Challanges;
DOT Indonesia Intern batch 3;

# Fitur
1.Login sederhana dengan memasukkan nama pengguna.
2.Pengambilan soal otomatis dari API Open Trivia Database.
3.Menampilkan jumlah soal dan progres pengerjaan.
4.Menampilkan soal satu per satu — setelah memilih jawaban langsung pindah ke soal berikutnya.
5.Timer countdown untuk batas waktu pengerjaan kuis.
6.Jika waktu habis, kuis otomatis selesai dan menampilkan hasil.
7.Menampilkan hasil kuis: jumlah benar, salah, dan total soal yang dikerjakan.
8.Mekanisme resume kuis saat browser ditutup, data kuis disimpan di localStorage sehingga pengguna dapat melanjutkan kuis dari posisi terakhir.
9.Tombol untuk kembali ke dashboard/login setelah kuis selesai.

# Teknologi
-React (Hooks & Functional Components)
-TypeScript
-Axios untuk HTTP request
-LocalStorage untuk penyimpanan state sementara
-API Open Trivia Database untuk soal kuis
-Menggunakan vanila css
Note:
-Soal kuis diambil secara random setiap kali login.
-Jumlah soal dan tipe soal bisa diatur dengan mengubah URL API di login function.
-Timer default 60 detik dapat disesuaikan sesuai kebutuhan.
-Soal yang ditampilkan berupa multiple choice dengan 4 opsi jawaban.
-Aplikasi sudah meng-handle karakter HTML entities pada soal dan jawaban menggunakan dangerouslySetInnerHTML.

