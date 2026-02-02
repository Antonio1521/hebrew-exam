const I18N = {
    ru: {
        menu_theory: "База Знаний", btn_connectors: "🔗 Таблица Связок", btn_vocab: "📚 Словарь", btn_graphs: "📊 Графики", btn_writing: "📝 Шаблоны Письма",
        menu_drills: "Тренажеры", btn_logic: "🧠 Логика (Часть B)", btn_rewrite: "✍️ Шихтув", btn_combine: "🧩 Хибур", btn_drill_graphs: "📈 Хамлала",
        menu_exam: "Экзамен", btn_essay: "💻 Симулятор Эссе",
        title_connectors: "Таблица Логических Связок", title_vocab: "Академический Словарь", title_graphs: "Словарь для Графиков", title_writing: "Шаблоны Письма",
        subtitle_structure: "מבנה פסקת עמדה (Структура Мнения)",
        title_logic_drill: "Тренажер: Логика", title_rewrite_drill: "Тренажер: Шихтув", title_combine_drill: "Тренажер: Хибур", title_graphs_drill: "Тренажер: Графики",
        title_essay_sim: "Симулятор Эссе", opt_select_topic: "🔽 Выберите тему экзамена...", msg_select_prompt: "Выберите тему, чтобы увидеть задание.",
        btn_new_questions: "🔄 Новые вопросы", btn_check: "🔍 Проверить", btn_reset: "🗑️ Сброс",
        label_source_text: "📄 Текст для чтения",
        table_conn: "Связка", table_gram: "Грамматика", table_ex: "Пример", table_bad: "Не писать", table_good: "Писать", table_cat: "Категория", table_words: "Слова"
    },
    en: {
        menu_theory: "Knowledge Base", btn_connectors: "🔗 Connectors Table", btn_vocab: "📚 Vocabulary", btn_graphs: "📊 Graphs Info", btn_writing: "📝 Writing Templates",
        menu_drills: "Drills", btn_logic: "🧠 Logic (Part B)", btn_rewrite: "✍️ Rewrite", btn_combine: "🧩 Combine", btn_drill_graphs: "📈 Graphs",
        menu_exam: "Exam Mode", btn_essay: "💻 Essay Simulator",
        title_connectors: "Connectors Table", title_vocab: "Academic Vocabulary", title_graphs: "Graphs Vocabulary", title_writing: "Writing Templates",
        subtitle_structure: "Opinion Paragraph Structure",
        title_logic_drill: "Drill: Logic", title_rewrite_drill: "Drill: Rewrite", title_combine_drill: "Drill: Combine", title_graphs_drill: "Drill: Graphs",
        title_essay_sim: "Essay Simulator", opt_select_topic: "🔽 Select exam topic...", msg_select_prompt: "Select a topic to see the prompt.",
        btn_new_questions: "🔄 New Questions", btn_check: "🔍 Check", btn_reset: "🗑️ Reset",
        label_source_text: "📄 Source Text",
        table_conn: "Connector", table_gram: "Grammar", table_ex: "Example", table_bad: "Don't use", table_good: "Use", table_cat: "Category", table_words: "Words"
    },
    he: {
        menu_theory: "מאגר ידע", btn_connectors: "🔗 מילות קישור", btn_vocab: "📚 אוצר מילים", btn_graphs: "📊 גרפים", btn_writing: "📝 תבניות כתיבה",
        menu_drills: "תרגול", btn_logic: "🧠 לוגיקה", btn_rewrite: "✍️ שחרוב", btn_combine: "🧩 חיבור משפטים", btn_drill_graphs: "📈 המללה",
        menu_exam: "בחינה", btn_essay: "💻 סימולטור כתיבה",
        title_connectors: "טבלת מילות קישור", title_vocab: "אוצר מילים אקדמי", title_graphs: "מילון לתיאור גרפים", title_writing: "תבניות כתיבה",
        subtitle_structure: "מבנה פסקת עמדה",
        title_logic_drill: "תרגול: לוגיקה", title_rewrite_drill: "תרגול: שחרוב", title_combine_drill: "תרגול: חיבור", title_graphs_drill: "תרגול: המללה",
        title_essay_sim: "סימולטור כתיבה", opt_select_topic: "🔽 בחר נושא...", msg_select_prompt: "בחר נושא כדי לראות את המטלה.",
        btn_new_questions: "🔄 שאלות חדשות", btn_check: "🔍 בדוק", btn_reset: "🗑️ איפוס",
        label_source_text: "📄 טקסט לקריאה",
        table_conn: "מילה", table_gram: "דקדוק", table_ex: "דוגמה", table_bad: "לא מומלץ", table_good: "מומלץ", table_cat: "קטגוריה", table_words: "מילים"
    }
};

const app = {
    currentLang: 'ru',

    init: function() {
        this.renderTheory();
        this.renderDrill('logic');
        this.populateEssayTopics();
        this.changeLanguage();
    },

    changeLanguage: function() {
        const lang = document.getElementById('lang-select').value;
        this.currentLang = lang;
        const texts = I18N[lang];

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (texts[key]) el.innerHTML = texts[key];
        });

        if (lang === 'he') {
            document.documentElement.setAttribute('dir', 'rtl');
            document.querySelector('.sidebar').style.borderLeft = 'none';
            document.querySelector('.sidebar').style.borderRight = '5px solid var(--accent)';
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
            document.querySelector('.sidebar').style.borderLeft = '5px solid var(--accent)';
            document.querySelector('.sidebar').style.borderRight = 'none';
        }

        this.renderTheory();
        document.getElementById('essay-area').placeholder = lang === 'he' ? "התחל לכתוב כאן..." : (lang === 'en' ? "Start writing here..." : "Начинайте писать здесь...");
    },

    show: function(id, btn) {
        document.querySelectorAll('.section').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        btn.classList.add('active');
        if(id.startsWith('drill-') && document.getElementById('container-'+id.split('-')[1]).innerHTML === "") {
            this.renderDrill(id.split('-')[1]);
        }
    },

    renderTheory: function() {
        const t = I18N[this.currentLang];
        const createTable = (data, headers) => {
            let html = `<table><thead><tr><th>${headers[0]}</th><th>${headers[1]}</th><th>${headers[2] || ''}</th></tr></thead><tbody>`;
            data.forEach(row => {
                html += `<tr><td><b>${row.word || row.bad || row.cat}</b></td><td>${row.rule || row.good || row.items}</td><td>${row.ex || ''}</td></tr>`;
            });
            html += '</tbody></table>';
            return html;
        };

        document.getElementById('table-connectors-container').innerHTML = DATA.theory_connectors.map(g => `<h3>${g.group}</h3>${createTable(g.examples, [t.table_conn, t.table_gram, t.table_ex])}`).join('');
        document.getElementById('table-vocab-container').innerHTML = createTable(DATA.theory_vocab, [t.table_bad, t.table_good, '']);
        document.getElementById('table-graphs-container').innerHTML = createTable(DATA.theory_graphs, [t.table_cat, t.table_words, '']);
    },

    renderDrill: function(type) {
        const container = document.getElementById('container-' + type);
        container.innerHTML = '';
        const items = [...DATA['drill_' + type]].sort(() => 0.5 - Math.random()).slice(0, 20);

        items.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            let title = `Вопрос ${index + 1}`;
            if(item.task) title = item.task; 
            let content = item.q;
            if (!content) {
                if (item.original) {
                    content = `"${item.original}"`;
                } else {
                    content = `1. ${item.s1}<br>2. ${item.s2}`;
                }
            }
            
            let html = `<div class="q-text"><span class="task-label">${title}</span><br>${content}</div>`;
            item.options.forEach((opt, idx) => {
                const safeExplain = item.explain.replace(/'/g, "\\'");
                html += `<button class="opt-btn" onclick="app.checkAnswer(this, ${idx === item.correct}, '${safeExplain}')">${opt}</button>`;
            });
            html += `<div class="feedback"></div>`;
            card.innerHTML = html;
            container.appendChild(card);
        });
    },

    checkAnswer: function(btn, isCorrect, explain) {
        const parent = btn.parentElement;
        const feedback = parent.querySelector('.feedback');
        parent.querySelectorAll('.opt-btn').forEach(b => b.disabled = true);
        const t = this.currentLang === 'he' ? {y: 'נכון', n: 'שגיאה'} : (this.currentLang === 'en' ? {y: 'Correct', n: 'Wrong'} : {y: 'Верно', n: 'Ошибка'});

        if (isCorrect) {
            btn.classList.add('correct');
            feedback.innerHTML = `✅ <b>${t.y}!</b> ${explain}`;
            feedback.style.background = "#d4edda"; feedback.style.color = "#155724";
        } else {
            btn.classList.add('wrong');
            feedback.innerHTML = `❌ <b>${t.n}.</b> ${explain}`;
            feedback.style.background = "#f8d7da"; feedback.style.color = "#721c24";
        }
        feedback.style.display = 'block';
    },

    toggleCheatSheet: function() {
        const sheet = document.getElementById('connectors-cheat-sheet');
        if (sheet.style.display === "none") {
            sheet.style.display = "block";
        } else {
            sheet.style.display = "none";
        }
    },

    populateEssayTopics: function() {
        const select = document.getElementById('essay-topic');
        select.innerHTML = `<option value="" data-i18n="opt_select_topic">${I18N[this.currentLang].opt_select_topic}</option>`;
        for (const [key, value] of Object.entries(DATA.essay_prompts)) {
            const title = value.split('<br>')[0].replace('<b>', '').replace('</b>', '').replace('<h4>', '').replace('</h4>', '');
            const option = document.createElement('option');
            option.value = key;
            option.text = title;
            select.appendChild(option);
        }
    },

    setEssayTopic: function() {
        const val = document.getElementById('essay-topic').value;
        const promptDiv = document.getElementById('essay-prompt');
        const textDiv = document.getElementById('source-text-container');
        
        if (val && DATA.essay_prompts[val]) {
            promptDiv.innerHTML = DATA.essay_prompts[val];
            if (DATA.essay_texts && DATA.essay_texts[val]) {
                textDiv.innerHTML = DATA.essay_texts[val];
            } else {
                textDiv.innerHTML = "<p style='text-align:center; margin-top:50px;'>Текст для этой темы отсутствует.</p>";
            }
        } else {
            promptDiv.innerHTML = I18N[this.currentLang].msg_select_prompt;
            textDiv.innerHTML = "<p style='color:#7f8c8d; text-align:center; margin-top:50px;'>" + (this.currentLang === 'he' ? "בחר נושא כדי לראות את הטקסט." : "Выберите тему, чтобы увидеть текст.") + "</p>";
        }
    },

    analyzeEssay: function() {
        const text = document.getElementById('essay-area').value.trim();
        const feedbackEl = document.getElementById('essay-feedback');
        
        if (text.length === 0) return;

        // Statistics
        const words = text.split(/\s+/).filter(w => w.length > 0);
        const sentences = text.split(/[.?!]+/).filter(s => s.trim().length > 0);
        const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
        
        let score = 0;
        let tips = [];
        let goodPoints = [];

        // 1. Length
        if (words.length < 30) {
            score += 10; tips.push("🔴 Текст слишком короткий.");
        } else if (words.length < 80) {
            score += 40; tips.push("🟠 Хорошее начало, но нужно больше деталей.");
        } else {
            score += 100; goodPoints.push("✅ Отличный объем.");
        }
        const lenScore = Math.min(score, 20);

        // 2. Vocabulary Check (Connectors)
        let foundConn = 0;
        let usedConn = [];
        DATA.theory_connectors.forEach(g => g.examples.forEach(ex => {
            const keyword = ex.word.split(' / ')[0];
            if(text.includes(keyword)) { foundConn++; usedConn.push(keyword); }
        }));
        // Убираем дубликаты
        usedConn = [...new Set(usedConn)];

        let vocabScore = 0;
        if(foundConn < 2) { vocabScore=5; tips.push("🔴 Мало связок (מילות קישור)."); }
        else { vocabScore=30; goodPoints.push(`✅ Использованы связки: ${usedConn.slice(0,3).join(', ')}...`); }

        // 3. Structure
        let structScore = 0;
        if(text.includes("לדעתי") || text.includes("אני סבור")) { structScore+=15; goodPoints.push("✅ Есть мнение."); }
        else { tips.push("🔴 Нет выражения мнения (לדעתי...)."); }

        if(text.includes("ראשית") || text.includes("סיבה") || text.includes("בנוסף")) { structScore+=15; goodPoints.push("✅ Есть аргументы."); }
        else { tips.push("🔴 Нет маркеров аргументов (ראשית/סיבה...)."); }

        if(text.includes("לסיכום") || text.includes("לאור האמור")) { structScore+=20; goodPoints.push("✅ Есть вывод."); }
        else { tips.push("🔴 Нет вывода (לסיכום...)."); }

        // Total
        const total = Math.min(100, lenScore + vocabScore + structScore);
        const color = total > 80 ? "green" : (total > 50 ? "orange" : "red");

        let html = `
            <div class="score-box ${color}"><h3>Оценка: ${total}/100</h3>
            <span style="font-size:0.8em">Слов: ${words.length} | Абзацев: ${paragraphs.length}</span></div>
            <div class="analysis-grid">
                <div class="col"><h4>👍 Хорошо:</h4><ul>${goodPoints.length ? goodPoints.map(i=>`<li>${i}</li>`).join('') : '<li>Пока ничего...</li>'}</ul></div>
                <div class="col"><h4>💡 Советы:</h4><ul>${tips.length ? tips.map(i=>`<li>${i}</li>`).join('') : '<li>Всё отлично!</li>'}</ul></div>
            </div>
        `;
        feedbackEl.innerHTML = html;
    }
};

app.init();
