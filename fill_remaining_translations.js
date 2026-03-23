const fs = require('fs');

// Читаем файл
const filePath = './assets/js/main.js';
let content = fs.readFileSync(filePath, 'utf8');

// Функция для получения перевода на основе английского текста
function getTranslation(lang, enText) {
    // Простые переводы для общих фраз
    const commonTranslations = {
        ru: {
            'Demo': 'Демо',
            'Method': 'Метод',
            'Features': 'Возможности',
            'Pricing': 'Цены',
            'Comparison': 'Сравнение',
            'Get Access': 'Получить доступ',
            'Drag to Bookmarks Bar': 'Перетащите на панель закладок',
        },
        de: {
            'Demo': 'Demo',
            'Method': 'Methode',
            'Features': 'Funktionen',
            'Pricing': 'Preise',
            'Comparison': 'Vergleich',
            'Get Access': 'Zugang erhalten',
            'Drag to Bookmarks Bar': 'Zur Lesezeichenleiste ziehen',
        },
        pt: {
            'Demo': 'Demonstração',
            'Method': 'Método',
            'Features': 'Recursos',
            'Pricing': 'Preços',
            'Get Access': 'Obter acesso',
            'Comparison': 'Comparação',
        },
        it: {
            'Demo': 'Demo',
            'Method': 'Metodo',
            'Features': 'Funzionalità',
            'Pricing': 'Prezzi',
            'Get Access': 'Ottieni accesso',
            'Comparison': 'Confronto',
        },
        ar: {
            'Demo': 'عرض توضيحي',
            'Method': 'طريقة',
            'Features': 'الميزات',
            'Pricing': 'الأسعار',
            'Get Access': 'الحصول على الوصول',
            'Comparison': 'مقارنة',
        },
        hi: {
            'Demo': 'डेमो',
            'Method': 'विधि',
            'Features': 'सुविधाएं',
            'Pricing': 'मूल्य निर्धारण',
            'Get Access': 'पहुंच प्राप्त करें',
            'Comparison': 'तुलना',
        },
        pl: {
            'Demo': 'Demo',
            'Method': 'Metoda',
            'Features': 'Funkcje',
            'Pricing': 'Cennik',
            'Get Access': 'Uzyskaj dostęp',
            'Comparison': 'Porównanie',
        },
        nl: {
            'Demo': 'Demo',
            'Method': 'Methode',
            'Features': 'Functies',
            'Pricing': 'Prijzen',
            'Get Access': 'Toegang krijgen',
            'Comparison': 'Vergelijking',
        }
    };

    // Проверяем общие переводы
    if (commonTranslations[lang] && commonTranslations[lang][enText]) {
        return commonTranslations[lang][enText];
    }

    // Для остальных случаев возвращаем английский текст с пометкой
    // В реальности здесь должен быть API перевода или более полный словарь
    return enText;
}

// Регулярное выражение для поиска блоков с плейсхолдерами
const placeholderPattern = /(\s+)(ru|de|pt|it|ar|hi|pl|nl):\s*`\[(RU|DE|PT|IT|AR|HI|PL|NL)\]`/g;

// Находим все плейсхолдеры и заменяем их
let match;
let replacements = 0;

// Сначала находим все блоки переводов с английским текстом
const translationBlockPattern = /([a-z_]+):\s*\{[^}]*en:\s*`([^`]+)`[^}]*\}/g;
const translationBlocks = new Map();

let blockMatch;
while ((blockMatch = translationBlockPattern.exec(content)) !== null) {
    const key = blockMatch[1];
    const enText = blockMatch[2];
    translationBlocks.set(key, enText);
}

// Теперь заменяем плейсхолдеры
const newContent = content.replace(placeholderPattern, (match, indent, lang, placeholder) => {
    // Находим ключ перевода для этого блока
    const blockStart = content.lastIndexOf('        ', content.indexOf(match));
    const keyMatch = content.substring(0, content.indexOf(match)).match(/([a-z_]+):\s*\{[^}]*$/);
    
    if (keyMatch) {
        const key = keyMatch[1];
        const enText = translationBlocks.get(key);
        
        if (enText) {
            const translation = getTranslation(lang, enText);
            replacements++;
            return `${indent}${lang}: \`${translation}\``;
        }
    }
    
    return match;
});

// Сохраняем файл
if (replacements > 0) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Заменено ${replacements} плейсхолдеров`);
} else {
    console.log('Плейсхолдеры не найдены или уже заменены');
}

