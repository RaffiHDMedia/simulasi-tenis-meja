let currentQuestion = 0;
let currentScore = 0;
let selectedAnswers = [];
let currentTopic = "";
let questions = {};

// Question Database
const questionBank = {
  service: [
    {
      question: "Apa yang dimaksud dengan 'first serve' dalam tenis meja?",
      image: "assets/images/soal/service/frist-serve.png",
      options: [
        "Servis pertama dalam permainan",
        "Servis dengan kecepatan tertinggi",
        "Servis yang harus melewati net terlebih dahulu",
        "Servis yang dilakukan dari sisi kanan meja",
      ],
      correct: 0,
      explanation:
        "First serve adalah servis pertama yang dilakukan pemain saat memulai permainan atau setelah pergantian servis.",
    },
    {
      question:
        "Berapa kali bola harus memantul saat melakukan servis yang benar?",
      image: "assets/images/soal/service/backspin.jpg",
      options: [
        "1 kali di meja sendiri, 1 kali di meja lawan",
        "2 kali di meja sendiri",
        "1 kali di meja lawan saja",
        "Langsung ke meja lawan tanpa memantul",
      ],
      correct: 0,
      explanation:
        "Servis yang benar harus memantul sekali di meja sendiri kemudian sekali di meja lawan.",
    },
    {
      question: "Apa kesalahan umum dalam teknik servis tenis meja?",
      image: "assets/images/soal/service/mistakes.webp",
      options: [
        "Bola dilempar terlalu rendah",
        "Bet terlalu dekat dengan bola",
        "Posisi kaki tidak seimbang",
        "Semua jawaban benar",
      ],
      correct: 3,
      explanation:
        "Semua pilihan tersebut merupakan kesalahan umum yang sering terjadi saat melakukan servis.",
    },
    {
      question:
        "Tinggi minimum lemparan bola saat servis menurut aturan ITTF adalah?",
      image: "assets/images/soal/service/tinggi.jpg",
      options: ["10 cm", "16 cm", "20 cm", "25 cm"],
      correct: 1,
      explanation:
        "Menurut aturan ITTF, bola harus dilempar minimal 16 cm dari telapak tangan yang terbuka dan datar.",
    },
    {
      question: "Posisi bet yang benar saat melakukan servis pendek adalah?",
      image: "assets/images/soal/service/service-pendek.jpg",
      options: [
        "Bet tegak lurus dengan meja",
        "Bet miring 45 derajat ke bawah",
        "Bet hampir sejajar dengan meja",
        "Bet mengarah ke atas",
      ],
      correct: 2,
      explanation:
        "Untuk servis pendek, bet harus hampir sejajar dengan meja agar bola memantul rendah dan dekat dengan net.",
    },
    {
      question: "Apa yang membedakan servis topspin dengan backspin?",
      image: "assets/images/soal/service/comparision.png",
      options: [
        "Arah gerakan bet saat kontak dengan bola",
        "Kecepatan ayunan bet",
        "Posisi kaki pemain",
        "Tinggi lemparan bola",
      ],
      correct: 0,
      explanation:
        "Topspin dihasilkan dengan menggesek bola dari bawah ke atas, sedangkan backspin dari atas ke bawah.",
    },
    {
      question:
        "Kapan pemain harus berganti posisi servis dalam permainan ganda?",
      image: "assets/images/soal/service/pindah-posisi.jpeg",
      options: [
        "Setiap 2 poin",
        "Setiap 5 poin",
        "Setiap set",
        "Setiap game berakhir",
      ],
      correct: 0,
      explanation:
        "Dalam permainan ganda, pemain berganti posisi servis setiap 2 poin dan rotasi pemain setiap poin.",
    },
    {
      question: "Servis sidespin paling efektif digunakan untuk?",
      image: "assets/images/soal/service/side-spin.webp",
      options: [
        "Mempercepat tempo permainan",
        "Mengganggu timing lawan",
        "Meningkatkan power pukulan",
        "Mempermudah return lawan",
      ],
      correct: 1,
      explanation:
        "Servis sidespin efektif mengganggu timing dan posisi lawan karena perubahan arah bola yang tidak terduga.",
    },
    {
      question: "Bagaimana cara melakukan servis reverse pendulum?",
      image: "assets/images/soal/service/service-pendulum.jpg",
      options: [
        "Mengayun bet dari kiri ke kanan",
        "Mengayun bet dari kanan ke kiri",
        "Mengayun bet lurus ke depan",
        "Mengayun bet ke atas",
      ],
      correct: 1,
      explanation:
        "Servis reverse pendulum dilakukan dengan mengayun bet dari kanan ke kiri, menghasilkan sidespin berlawanan.",
    },
    {
      question: "Apa yang harus diperhatikan saat melakukan servis cepat?",
      image: "assets/images/soal/service/sevice-cepat.webp",
      options: [
        "Akurasi penempatan bola",
        "Kecepatan maksimal",
        "Efek spin yang kuat",
        "Variasi tinggi pantulan",
      ],
      correct: 0,
      explanation:
        "Servis cepat yang efektif mengutamakan akurasi penempatan untuk menyulitkan return lawan, bukan hanya kecepatan.",
    },
  ],

  footwork: [
    {
      question: "Apa prinsip dasar pergerakan kaki dalam tenis meja?",
      image: "assets/images/soal/footwork/footwork.jpg",
      options: [
        "Bergerak dengan langkah besar",
        "Selalu menggunakan kaki kanan terlebih dahulu",
        "Gerakan kecil dan cepat dengan posisi siap",
        "Berdiri diam di satu posisi",
      ],
      correct: 2,
      explanation:
        "Footwork yang baik menggunakan gerakan kecil dan cepat sambil mempertahankan posisi siap untuk respons yang optimal.",
    },
    {
      question: "Kapan waktu terbaik untuk menggerakkan kaki?",
      image: "assets/images/soal/footwork/basicStep.webp",
      options: [
        "Setelah bola dipukul lawan",
        "Saat bola sedang di udara",
        "Sebelum lawan memukul bola",
        "Saat bola menyentuh meja",
      ],
      correct: 2,
      explanation:
        "Antisipasi pergerakan harus dimulai sebelum lawan memukul bola untuk memberikan waktu reaksi yang cukup.",
    },
    {
      question: "Posisi kaki yang benar dalam stance siap adalah?",
      image: "assets/images/soal/footwork/crossStep.webp",
      options: [
        "Kaki rapat dan lurus",
        "Kaki selebar bahu, lutut sedikit ditekuk",
        "Kaki kiri di depan, kaki kanan di belakang",
        "Satu kaki diangkat dari lantai",
      ],
      correct: 1,
      explanation:
        "Stance siap yang benar adalah kaki selebar bahu dengan lutut sedikit ditekuk untuk keseimbangan dan mobilitas optimal.",
    },
    {
      question: "Teknik pivot yang benar dilakukan dengan cara?",
      image: "assets/images/soal/footwork/pivot.jpg",
      options: [
        "Memutar seluruh tubuh tanpa menggerakkan kaki",
        "Menggerakkan satu kaki sebagai poros, kaki lain berputar",
        "Melompat sambil berputar",
        "Menggeser kedua kaki bersamaan",
      ],
      correct: 1,
      explanation:
        "Pivot dilakukan dengan satu kaki sebagai poros (biasanya kaki kanan untuk forehand) sementara kaki lain berputar mengikuti arah bola.",
    },
    {
      question: "Pergerakan side-to-side yang efisien menggunakan teknik?",
      image: "assets/images/soal/footwork/side-to-side.jpg",
      options: ["Cross-step", "Shuffle step", "Running step", "Jumping step"],
      correct: 1,
      explanation:
        "Shuffle step adalah teknik paling efisien untuk pergerakan side-to-side karena menjaga keseimbangan dan kecepatan.",
    },
    {
      question:
        "Saat bola datang ke sudut backhand yang jauh, footwork yang tepat adalah?",
      image: "assets/images/soal/footwork/backhend-corner.jpg",
      options: [
        "Melangkah mundur",
        "Cross-step ke kiri",
        "Pivot ke kanan",
        "Berdiri diam",
      ],
      correct: 1,
      explanation:
        "Cross-step ke kiri memungkinkan jangkauan maksimal untuk mengembalikan bola di sudut backhand yang jauh.",
    },
    {
      question: "Recovery step setelah memukul bola berfungsi untuk?",
      image: "assets/images/soal/footwork/recovery-step.webp",
      options: [
        "Menambah power pukulan",
        "Kembali ke posisi siap",
        "Mengintimidasi lawan",
        "Menjaga keseimbangan saja",
      ],
      correct: 1,
      explanation:
        "Recovery step penting untuk segera kembali ke posisi siap dan mempersiapkan diri untuk pukulan berikutnya.",
    },
    {
      question: "Footwork untuk mengembalikan bola tinggi yang tepat adalah?",
      image: "assets/images/soal/footwork/high-ball-movement.jpeg",
      options: [
        "Melangkah maju dan ke samping",
        "Mundur dari meja",
        "Tetap di posisi awal",
        "Melompat untuk menjangkau",
      ],
      correct: 1,
      explanation:
        "Untuk bola tinggi, pemain perlu mundur dari meja untuk mendapat ruang dan sudut yang tepat untuk smash atau attack.",
    },
    {
      question: "Kesalahan umum dalam footwork tenis meja adalah?",
      image: "assets/images/soal/footwork/mistakes.webp",
      options: [
        "Gerakan terlalu lambat",
        "Posisi kaki terlalu lebar",
        "Tidak kembali ke posisi siap",
        "Semua jawaban benar",
      ],
      correct: 3,
      explanation:
        "Semua pilihan tersebut adalah kesalahan umum yang mengurangi efektivitas footwork dalam tenis meja.",
    },
    {
      question: "Latihan shadow play bermanfaat untuk mengembangkan?",
      image: "assets/images/soal/footwork/shadow-play.jpg",
      options: [
        "Kekuatan otot kaki",
        "Koordinasi footwork dan timing",
        "Fleksibilitas tubuh",
        "Daya tahan kardiovaskular",
      ],
      correct: 1,
      explanation:
        "Shadow play membantu mengembangkan koordinasi antara pergerakan kaki dan timing pukulan tanpa bola.",
    },
  ],

  smash: [
    {
      question: "Kapan timing terbaik untuk melakukan smash?",
      image: "assets/images/soal/smash/timming-smash.jpg",
      options: [
        "Saat bola masih naik",
        "Saat bola di titik tertinggi",
        "Saat bola mulai turun",
        "Saat bola hampir menyentuh meja",
      ],
      correct: 1,
      explanation:
        "Smash paling efektif dilakukan saat bola berada di titik tertinggi untuk mendapat kekuatan dan sudut maksimal.",
    },
    {
      question: "Apa yang harus diperhatikan saat melakukan smash?",
      image: "assets/images/soal/smash/timing.webp",
      options: [
        "Posisi kaki dan keseimbangan tubuh",
        "Timing dan titik kontak dengan bola",
        "Follow through setelah memukul",
        "Semua jawaban benar",
      ],
      correct: 3,
      explanation:
        "Smash yang efektif memerlukan koordinasi dari posisi tubuh, timing yang tepat, dan gerakan lanjutan yang baik.",
    },
    {
      question: "Posisi bet yang ideal untuk smash forehand adalah?",
      image: "assets/images/soal/smash/forehandSmash.jpg",
      options: [
        "Bet tegak lurus dengan meja",
        "Bet miring 45 derajat ke depan",
        "Bet sedikit tertutup (closed)",
        "Bet terbuka (open)",
      ],
      correct: 2,
      explanation:
        "Bet yang sedikit tertutup membantu mengarahkan bola ke bawah dan memberikan kontrol yang lebih baik pada smash.",
    },
    {
      question: "Gerakan tubuh yang benar saat melakukan smash adalah?",
      image: "assets/images/soal/smash/body-rotation.jpg",
      options: [
        "Hanya menggunakan lengan",
        "Rotasi pinggul dan bahu secara bersamaan",
        "Mengangkat kedua kaki dari lantai",
        "Membungkuk ke depan",
      ],
      correct: 1,
      explanation:
        "Rotasi pinggul dan bahu secara bersamaan menghasilkan power maksimal dan transfer energi yang efisien untuk smash.",
    },
    {
      question: "Titik kontak bola yang ideal untuk smash adalah?",
      image: "assets/images/soal/smash/contactPoint.jpeg",
      options: [
        "Di depan tubuh, setinggi dada",
        "Di samping tubuh, setinggi bahu",
        "Di atas kepala",
        "Di belakang tubuh",
      ],
      correct: 0,
      explanation:
        "Titik kontak di depan tubuh setinggi dada memberikan kontrol dan power terbaik untuk smash yang efektif.",
    },
    {
      question: "Bagaimana cara melakukan smash backhand yang efektif?",
      image: "assets/images/soal/smash/backhand-smash.webp",
      options: [
        "Menggunakan gerakan pergelangan tangan saja",
        "Rotasi tubuh dari kiri ke kanan",
        "Ayunan vertikal ke bawah",
        "Kombinasi rotasi tubuh dan snap pergelangan",
      ],
      correct: 3,
      explanation:
        "Smash backhand efektif memerlukan kombinasi rotasi tubuh dan snap pergelangan untuk menghasilkan power dan akurasi.",
    },
    {
      question: "Footwork yang tepat sebelum melakukan smash adalah?",
      image: "assets/images/soal/smash/smash-footwork.jpg",
      options: [
        "Tetap di posisi awal",
        "Mundur dan posisikan tubuh di belakang bola",
        "Maju ke depan meja",
        "Bergerak ke samping",
      ],
      correct: 1,
      explanation:
        "Mundur dan memposisikan tubuh di belakang bola memberikan ruang dan sudut yang optimal untuk smash yang kuat.",
    },
    {
      question: "Kesalahan umum dalam melakukan smash adalah?",
      image: "assets/images/soal/smash/smash-mistakes.jpg",
      options: [
        "Terburu-buru dalam timing",
        "Tidak menggunakan rotasi tubuh",
        "Kurang follow through",
        "Semua jawaban benar",
      ],
      correct: 3,
      explanation:
        "Semua pilihan tersebut adalah kesalahan umum yang mengurangi efektivitas dan akurasi smash.",
    },
    {
      question:
        "Variasi smash yang dapat digunakan untuk mengecoh lawan adalah?",
      image: "assets/images/soal/smash/smash-variation.jpg",
      options: [
        "Smash cross-court dan down-the-line",
        "Smash dengan power berbeda",
        "Smash dengan sudut berbeda",
        "Semua jawaban benar",
      ],
      correct: 3,
      explanation:
        "Variasi arah, power, dan sudut smash membuat lawan sulit memprediksi dan mempersiapkan defense.",
    },
    {
      question: "Latihan terbaik untuk meningkatkan power smash adalah?",
      image: "assets/images/soal/smash/timing.webp",
      options: [
        "Multi-ball training",
        "Shadow play dengan beban",
        "Latihan rotational power",
        "Semua jawaban benar",
      ],
      correct: 3,
      explanation:
        "Kombinasi latihan multi-ball, shadow play, dan rotational power secara komprehensif meningkatkan kekuatan smash.",
    },
  ],

  backhand: [
    {
      question: "Apa posisi bet yang benar untuk backhand drive?",
      image: "assets/images/soal/backhand/backhand-drive-position.webp",
      options: [
        "Bet tegak lurus dengan meja",
        "Bet sedikit miring ke depan",
        "Bet sejajar dengan meja",
        "Bet miring ke belakang",
      ],
      correct: 1,
      explanation:
        "Bet yang sedikit miring ke depan membantu menghasilkan topspin dan kontrol yang baik pada backhand drive.",
    },
    {
      question: "Gerakan mana yang paling penting dalam backhand?",
      image: "assets/images/soal/backhand/backhand-rotation.jpg",
      options: [
        "Gerakan pergelangan tangan",
        "Rotasi pinggul dan bahu",
        "Ayunan lengan yang panjang",
        "Gerakan kaki yang aktif",
      ],
      correct: 1,
      explanation:
        "Rotasi pinggul dan bahu memberikan tenaga utama dalam pukulan backhand, bukan hanya gerakan lengan.",
    },
    {
      question: "Posisi kaki yang benar untuk backhand topspin adalah?",
      image: "assets/images/soal/backhand/backhand-footwork.jpeg",
      options: [
        "Kaki kanan sedikit di depan",
        "Kaki kiri sedikit di depan",
        "Kedua kaki sejajar",
        "Kaki kanan jauh di belakang",
      ],
      correct: 1,
      explanation:
        "Kaki kiri sedikit di depan memberikan keseimbangan dan ruang untuk rotasi tubuh yang optimal pada backhand topspin.",
    },
    {
      question: "Titik kontak bola yang ideal untuk backhand loop adalah?",
      image: "assets/images/soal/backhand/contact-point.jpeg",
      options: [
        "Saat bola naik (ascending phase)",
        "Saat bola di puncak",
        "Saat bola turun (descending phase)",
        "Saat bola hampir menyentuh meja",
      ],
      correct: 0,
      explanation:
        "Backhand loop paling efektif dilakukan saat bola dalam fase naik untuk menghasilkan topspin yang kuat.",
    },
    {
      question: "Bagaimana cara melakukan backhand block yang efektif?",
      image: "assets/images/soal/backhand/backhand-block.jpeg",
      options: [
        "Mengayun bet ke belakang",
        "Memajukan bet dengan sudut tertutup",
        "Mengangkat bet tinggi-tinggi",
        "Menggerakkan bet ke samping",
      ],
      correct: 1,
      explanation:
        "Backhand block efektif dilakukan dengan memajukan bet dalam sudut tertutup untuk mengendalikan bola yang keras.",
    },
    {
      question: "Kesalahan umum dalam teknik backhand adalah?",
      image: "assets/images/soal/backhand/backhand-errors.webp",
      options: [
        "Terlalu mengandalkan pergelangan tangan",
        "Kurang rotasi tubuh",
        "Timing yang terlambat",
        "Semua jawaban benar",
      ],
      correct: 3,
      explanation:
        "Semua pilihan tersebut adalah kesalahan umum yang mengurangi efektivitas teknik backhand.",
    },
    {
      question: "Variasi backhand yang dapat digunakan untuk menyerang adalah?",
      image: "assets/images/soal/backhand/backhand-attack-variations.jpg",
      options: [
        "Backhand drive dan loop",
        "Backhand flick dan flip",
        "Backhand counter dan smash",
        "Semua jawaban benar",
      ],
      correct: 3,
      explanation:
        "Berbagai variasi backhand attack memberikan opsi yang fleksibel untuk menyerang dalam situasi yang berbeda.",
    },
    {
      question: "Backhand sidespin dilakukan dengan cara?",
      image: "assets/images/soal/backhand/backhand-sidespin.jpg",
      options: [
        "Menggesek bola dari kiri ke kanan",
        "Menggesek bola dari kanan ke kiri",
        "Menggesek bola dari bawah ke atas",
        "Menggesek bola dari atas ke bawah",
      ],
      correct: 0,
      explanation:
        "Backhand sidespin dihasilkan dengan menggesek bola dari kiri ke kanan untuk menghasilkan side-topspin.",
    },
    {
      question: "Kapan waktu yang tepat untuk menggunakan backhand flip?",
      image: "assets/images/soal/backhand/backhand-flip-timing.jpg",
      options: [
        "Melawan servis pendek",
        "Melawan bola tinggi",
        "Melawan smash lawan",
        "Melawan bola panjang",
      ],
      correct: 0,
      explanation:
        "Backhand flip sangat efektif digunakan untuk menyerang servis pendek yang tidak dapat dikembalikan dengan topspin biasa.",
    },
    {
      question: "Latihan yang efektif untuk meningkatkan backhand adalah?",
      image: "assets/images/soal/backhand/backhand-training.webp",
      options: [
        "Multi-ball backhand drive",
        "Backhand block against topspin",
        "Backhand to backhand rally",
        "Semua jawaban benar",
      ],
      correct: 3,
      explanation:
        "Kombinasi berbagai latihan backhand secara komprehensif meningkatkan teknik, timing, dan konsistensi pukulan backhand.",
    },
  ],
};

// Navigation Functions
function switchTab(tabName) {
  // Hide all sections
  document.querySelectorAll(".content-section").forEach((section) => {
    section.classList.add("hidden");
  });

  // Remove active class from all tabs
  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.classList.remove("active");
  });

  // Show selected section
  document.getElementById(tabName).classList.remove("hidden");

  // Add active class to clicked tab
  event.target.classList.add("active");
}

// Simulator Functions
function showPanel(panelId) {
  // Hide all panels first
  document.querySelectorAll(".detail-panel").forEach((panel) => {
    panel.classList.add("hidden");
    panel.classList.remove("visible");
  });

  // Show selected panel
  const panel = document.getElementById(panelId);
  if (panel) {
    panel.classList.remove("hidden");
    setTimeout(() => {
      panel.classList.add("visible");
    }, 100);
  }
}

function hidePanel() {
  document.querySelectorAll(".detail-panel").forEach((panel) => {
    panel.classList.remove("visible");
    setTimeout(() => {
      panel.classList.add("hidden");
    }, 300);
  });
}

// Strategy Functions
function createSchedule() {
  const strategy = document.getElementById("strategySelect").value;
  const resultDiv = document.getElementById("programResult");
  const contentDiv = document.getElementById("programContent");

  if (!strategy) {
    alert("Silakan pilih fokus latihan terlebih dahulu!");
    return;
  }

  const program = trainingPrograms[strategy];
  let scheduleHTML = `<h5><i class="fas fa-dumbbell"></i> ${program.title}</h5>`;

  program.schedule.forEach((day) => {
    scheduleHTML += `
                    <div class="schedule-item">
                        <h6><i class="fas fa-calendar-day"></i> ${day.day}</h6>
                        <ul style="margin: 10px 0; padding-left: 20px;">
                `;

    day.activities.forEach((activity) => {
      scheduleHTML += `<li style="margin: 5px 0;">${activity}</li>`;
    });

    scheduleHTML += `</ul></div>`;
  });

  scheduleHTML += `
                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.3);">
                    <p><i class="fas fa-info-circle"></i> <strong>Tips:</strong> Konsistensi adalah kunci keberhasilan. Lakukan latihan secara rutin dan fokus pada kualitas gerakan.</p>
                </div>
            `;

  contentDiv.innerHTML = scheduleHTML;
  resultDiv.classList.remove("hidden");
}

// Quiz Functions
function beginAssessment() {
  const topic = document.getElementById("assessmentTopicSelect").value;

  if (!topic) {
    alert("Silakan pilih area evaluasi terlebih dahulu!");
    return;
  }

  currentTopic = topic;
  questions = questionBank[topic];
  currentQuestion = 0;
  currentScore = 0;
  selectedAnswers = [];

  document.getElementById("assessmentStart").classList.add("hidden");
  document.getElementById("assessmentContent").classList.remove("hidden");

  loadQuestion();
  updateProgress();
}

function loadQuestion() {
  if (currentQuestion >= questions.length) {
    showResults();
    return;
  }

  const question = questions[currentQuestion];
  const container = document.getElementById("questionContainer");

  let questionHTML = `
    <div class="question-card">
      <h5><i class="fas fa-question"></i> ${question.question}</h5>
      ${
        question.image
          ? `<div class="question-image-container">
        <img src="${question.image}" alt="Ilustrasi Pertanyaan" class="question-image" />
      </div>`
          : ""
      }
      <div class="mt-3">
  `;

  question.options.forEach((option, index) => {
    const isSelected = selectedAnswers[currentQuestion] === index;
    questionHTML += `
      <button class="answer-option ${isSelected ? "selected" : ""}"
              onclick="selectAnswer(${index})"
              data-option="${index}">
          ${String.fromCharCode(65 + index)}. ${option}
      </button>
    `;
  });

  questionHTML += `</div></div>`;
  container.innerHTML = questionHTML;

  document.getElementById("currentQuestionNum").textContent =
    currentQuestion + 1;
  document.getElementById("prevBtn").disabled = currentQuestion === 0;

  if (currentQuestion === questions.length - 1) {
    document.getElementById("nextBtn").innerHTML =
      '<i class="fas fa-check"></i> Selesai';
  } else {
    document.getElementById("nextBtn").innerHTML =
      'Selanjutnya <i class="fas fa-arrow-right"></i>';
  }
}

function selectAnswer(answerIndex) {
  selectedAnswers[currentQuestion] = answerIndex;

  // Update UI
  document.querySelectorAll(".answer-option").forEach((btn) => {
    btn.classList.remove("selected");
  });

  document
    .querySelector(`[data-option="${answerIndex}"]`)
    .classList.add("selected");
}

function nextQuestion() {
  if (selectedAnswers[currentQuestion] === undefined) {
    alert("Silakan pilih jawaban terlebih dahulu!");
    return;
  }

  currentQuestion++;
  loadQuestion();
  updateProgress();
}

function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
    updateProgress();
  }
}

function updateProgress() {
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  document.getElementById("progressFill").style.width = progress + "%";
}

function showResults() {
  // Hitung skor
  currentScore = 0;
  let detailedResults = [];
  let correctAnswers = 0;
  let incorrectAnswers = 0;

  questions.forEach((question, index) => {
    const isCorrect = selectedAnswers[index] === question.correct;
    if (isCorrect) {
      currentScore++;
      correctAnswers++;
    } else {
      incorrectAnswers++;
    }

    detailedResults.push({
      questionNum: index + 1,
      question: question.question,
      userAnswer: selectedAnswers[index],
      correctAnswer: question.correct,
      options: question.options,
      explanation: question.explanation,
      isCorrect: isCorrect,
    });
  });

  const percentage = (currentScore / questions.length) * 100;
  let grade, recommendation;

  if (percentage >= 90) {
    grade = "Excellent (A)";
    recommendation =
      "Luar biasa! Anda menguasai teknik ini dengan sangat baik. Anda siap untuk teknik tingkat lanjut dan kompetisi.";
  } else if (percentage >= 80) {
    grade = "Very Good (B+)";
    recommendation =
      "Sangat baik! Anda memiliki pemahaman yang solid. Tingkatkan dengan latihan konsisten.";
  } else if (percentage >= 70) {
    grade = "Good (B)";
    recommendation =
      "Bagus! Masih ada beberapa area yang perlu diperbaiki. Fokus pada latihan dasar dan teknik fundamental.";
  } else if (percentage >= 60) {
    grade = "Fair (C)";
    recommendation =
      "Cukup baik, namun perlu lebih banyak latihan. Pelajari kembali materi dan praktikkan lebih sering.";
  } else {
    grade = "Needs Improvement (D)";
    recommendation =
      "Perlu banyak latihan tambahan. Disarankan untuk mempelajari kembali teknik fundamental dan berkonsultasi dengan pelatih.";
  }

  // Tampilkan hasil utama
  document.getElementById("finalScore").innerHTML = `
    <div class="score-display">
      <h3><i class="fas fa-trophy"></i> ${currentScore}/${
    questions.length
  } (${percentage.toFixed(0)}%)</h3>
      <h4 class="grade-display">Grade: ${grade}</h4>
    </div>
  `;

  // Tampilkan rekomendasi
  document.getElementById("recommendations").innerHTML = `
    <p style="margin-top: 15px;"><i class="fas fa-lightbulb"></i> <strong>Rekomendasi:</strong></p>
    <p>${recommendation}</p>

    <div class="detailed-results mt-4">
      <h5><i class="fas fa-list-alt"></i> Review Jawaban:</h5>
      ${detailedResults
        .map(
          (result) => `
        <div class="result-item ${result.isCorrect ? "correct" : "incorrect"}">
          <div class="result-header">
            <span class="question-number">Q${result.questionNum}</span>
            <span class="result-status">
              ${
                result.isCorrect
                  ? '<i class="fas fa-check-circle text-success"></i> Benar'
                  : '<i class="fas fa-times-circle text-danger"></i> Salah'
              }
            </span>
          </div>
          <p class="question-text">${result.question}</p>
          <div class="answer-comparison">
            ${
              result.userAnswer !== undefined
                ? `
              <p><strong>Jawaban Anda:</strong> ${
                result.options[result.userAnswer]
              }</p>
            `
                : "<p><strong>Jawaban Anda:</strong> Tidak dijawab</p>"
            }
            <p><strong>Jawaban Benar:</strong> ${
              result.options[result.correctAnswer]
            }</p>
            <p class="explanation"><strong>Penjelasan:</strong> ${
              result.explanation
            }</p>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;

  // Tampilkan chart hasil evaluasi
  const ctx = document.getElementById("resultChart").getContext("2d");
  const resultChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Benar", "Salah"],
      datasets: [
        {
          label: "Evaluasi Jawaban",
          data: [correctAnswers, incorrectAnswers],
          backgroundColor: ["#28a745", "#dc3545"],
          borderColor: ["#fff", "#fff"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              let percentage = tooltipItem.raw;
              return `${tooltipItem.label}: ${percentage} jawaban`;
            },
          },
        },
      },
    },
  });

  document.getElementById("assessmentContent").classList.add("hidden");
  document.getElementById("assessmentResults").classList.remove("hidden");
}

function restartQuiz() {
  document.getElementById("assessmentResults").classList.add("hidden");
  document.getElementById("assessmentStart").classList.remove("hidden");

  // Reset form
  document.getElementById("assessmentTopicSelect").value = "";
  currentQuestion = 0;
  currentScore = 0;
  selectedAnswers = [];
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
  // Tab navigation
  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      const target = this.getAttribute("data-target");
      switchTab(target);
    });
  });

  // Interactive elements in simulator
  document.querySelectorAll(".interactive-element").forEach((element) => {
    element.addEventListener("click", function () {
      const target = this.getAttribute("data-target");
      if (target) {
        showPanel(target + "-details");
      }
    });
  });
});
