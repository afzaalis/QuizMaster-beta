# Frontend React Challenges  
**DOT Indonesia Intern Batch**

---
# APLIKASI SIMPLE QUIZ USING REACT
![image](https://github.com/user-attachments/assets/48a7eaff-5e5e-40d8-87f6-0d32eb6f1a7d)

## Fitur

1. Login sederhana dengan memasukkan nama pengguna.  
2. Pengambilan soal otomatis dari API [Open Trivia Database](https://opentdb.com/).  
3. Menampilkan jumlah soal dan progres pengerjaan.  
4. Menampilkan soal satu per satu — setelah memilih jawaban langsung pindah ke soal berikutnya.  
5. Timer countdown untuk batas waktu pengerjaan kuis.  
6. Jika waktu habis, kuis otomatis selesai dan menampilkan hasil.  
7. Menampilkan hasil kuis: jumlah benar, salah, dan total soal yang dikerjakan.  
8. Mekanisme resume kuis saat browser ditutup, data kuis disimpan di `localStorage` sehingga pengguna dapat melanjutkan kuis dari posisi terakhir.  
9. Tombol untuk kembali ke dashboard/login setelah kuis selesai.  

---

## Teknologi

- React (Hooks & Functional Components)  
- TypeScript  
- Axios untuk HTTP request  
- `localStorage` untuk penyimpanan state sementara  
- API Open Trivia Database untuk soal kuis  
- Styling menggunakan Vanilla CSS  

---

## Catatan

- Soal kuis diambil secara random setiap kali login.  
- Jumlah soal dan tipe soal dapat diatur dengan mengubah URL API pada fungsi login.  
- Timer default adalah 60 detik dan bisa disesuaikan sesuai kebutuhan.  
- Soal yang ditampilkan berupa multiple choice dengan 4 opsi jawaban.  
- Aplikasi sudah meng-handle karakter HTML entities pada soal dan jawaban menggunakan `dangerouslySetInnerHTML`.  

---
