document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const sectionsWithId = Array.from(document.querySelectorAll('section[id]'));
    const allSections = document.querySelectorAll('section');
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const navbar = document.querySelector('.nav-wrapper');
    const heroGradient = document.querySelector('.hero-bg-gradient');
    const heroSection = document.querySelector('.hero-section');
    const prefersHover = window.matchMedia('(hover: hover)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const noticeSelectors = [
        '[data-blackfish]',
        '[data-blackfish-modal]',
        '[data-blackfish-alert]',
        '.blackfishtool-notice',
        '.blackfishtool-modal',
        '.blackfishtool-overlay',
        '.notice-overlay',
        '.notice-modal',
        '.notice-window'
    ];
    const noticeSignatures = [
        'Please go to the Hyperliquid website',
        'You must drag the bookmarklet',
        'You are now being redirected',
        'You must be signed in to use this bookmarklet',
        'Failed to execute the bookmarklet'
    ];
    const animatedSelectors = [
        '.hero-content',
        '.hero-preview',
        '.bookmarklet-card',
        '.hero-signal',
        '.demo-container',
        '.demo-stat',
        '.setup-card',
        '.setup-header',
        '.method-item',
        '.terminal-window',
        '.feature-card',
        '.pricing-header',
        '.pricing-card',
        '.comparison-table',
        '.faq-item',
        '.footer-container'
    ];
    const animatedElements = animatedSelectors.flatMap(selector => Array.from(document.querySelectorAll(selector)));
    const bookmarkletButtons = document.querySelectorAll('.bookmarklet');
    const translations = {
        nav_demo: {
            en: `Demo`,
            zh: `演示`,
            fr: `Démo`,
            ko: `데모`,
            es: `Demostración`,
            ja: `デモ`,
            tr: `Demo`,
            vi: `Bản demo`,
            ru: `Демо`,
            de: `Demo`,
            pt: `Demonstração`,
            it: `Demo`,
            ar: `عرض توضيحي`,
            hi: `डेमो`,
            pl: `Demo`,
            nl: `Demo`
        },
        nav_method: {
            en: `Method`,
            zh: `方法`,
            fr: `Méthode`,
            ko: `방법`,
            es: `Método`,
            ja: `手法`,
            tr: `Yöntem`,
            vi: `Phương pháp`,
            ru: `Метод`,
            de: `Methode`,
            pt: `Método`,
            it: `Metodo`,
            ar: `طريقة`,
            hi: `विधि`,
            pl: `Metoda`,
            nl: `Methode`
        },
        nav_features: {
            en: `Features`,
            zh: `功能`,
            fr: `Fonctionnalités`,
            ko: `기능`,
            es: `Funciones`,
            ja: `機能`,
            tr: `Özellikler`,
            vi: `Tính năng`,
            ru: `Возможности`,
            de: `Funktionen`,
            pt: `Recursos`,
            it: `Funzionalità`,
            ar: `الميزات`,
            hi: `सुविधाएं`,
            pl: `Funkcje`,
            nl: `Functies`
        },
        nav_pricing: {
            en: `Pricing`,
            zh: `定价`,
            fr: `Tarifs`,
            ko: `요금`,
            es: `Precios`,
            ja: `料金`,
            tr: `Fiyatlandırma`,
            vi: `Bảng giá`,
            ru: `Цены`,
            de: `Preise`,
            pt: `Preços`,
            it: `Prezzi`,
            ar: `الأسعار`,
            hi: `मूल्य निर्धारण`,
            pl: `Cennik`,
            nl: `Prijzen`
        },
        nav_comparison: {
            en: `Comparison`,
            zh: `对比`,
            fr: `Comparatif`,
            ko: `비교`,
            es: `Comparativa`,
            ja: `比較`,
            tr: `Karşılaştırma`,
            vi: `So sánh`,
            ru: `Сравнение`,
            de: `Vergleich`,
            pt: `Comparação`,
            it: `Confronto`,
            ar: `مقارنة`,
            hi: `तुलना`,
            pl: `Porównanie`,
            nl: `Vergelijking`
        },
        nav_cta: {
            en: `Get Access`,
            zh: `获取访问权`,
            fr: `Obtenir l'accès`,
            ko: `접근 권한 받기`,
            es: `Obtener acceso`,
            ja: `アクセスを取得`,
            tr: `Erişim al`,
            vi: `Nhận quyền truy cập`,
            ru: `Получить доступ`,
            de: `Zugang erhalten`,
            pt: `Obter acesso`,
            it: `Ottieni accesso`,
            ar: `الحصول على الوصول`,
            hi: `पहुंच प्राप्त करें`,
            pl: `Uzyskaj dostęp`,
            nl: `Toegang krijgen`
        },
        hero_badge: {
            en: `Hyperliquid v1.4 · Local Execution Layer`,
            zh: `Hyperliquid v1.4 · 本地执行层`,
            fr: `Hyperliquid v1.4 · Couche d'exécution locale`,
            ko: `Hyperliquid v1.4 · 로컬 실행 레이어`,
            es: `Hyperliquid v1.4 · Capa de ejecución local`,
            ja: `Hyperliquid v1.4 · ローカル実行レイヤー`,
            tr: `Hyperliquid v1.4 · Yerel yürütme katmanı`,
            vi: `Hyperliquid v1.4 · Lớp thực thi cục bộ`,
            ru: `Hyperliquid v1.4 · Локальный слой выполнения`,
            de: `Hyperliquid v1.4 · Lokale Ausführungsschicht`,
            pt: `Hyperliquid v1.4 · Camada de Execução Local`,
            it: `Hyperliquid v1.4 · Strato di Esecuzione Locale`,
            ar: `Hyperliquid v1.4 · طبقة التنفيذ المحلية`,
            hi: `Hyperliquid v1.4 · स्थानीय निष्पादन परत`,
            pl: `Hyperliquid v1.4 · Lokalna Warstwa Wykonawcza`,
            nl: `Hyperliquid v1.4 · Lokale Uitvoeringslaag`
        },
        hero_title_line1: {
            en: `EXECUTE LOCAL.`,
            zh: `本地执行。`,
            fr: `EXÉCUTER LOCAL.`,
            ko: `로컬 실행.`,
            es: `EJECUTA LOCAL.`,
            ja: `ローカルで実行。`,
            tr: `YEREL ÇALIŞTIR.`,
            vi: `THỰC THI CỤC BỘ.`,
            ru: `ВЫПОЛНЯЙ ЛОКАЛЬНО.`,
            de: `LOKAL AUSFÜHREN.`,
            pt: `EXECUTE LOCALMENTE.`,
            it: `ESEGUI LOCALMENTE.`,
            ar: `نفذ محلياً.`,
            hi: `स्थानीय रूप से निष्पादित करें।`,
            pl: `WYKONUJ LOKALNIE.`,
            nl: `UITVOEREN LOKAAL.`
        },
        hero_title_line2: {
            en: `WIN GLOBAL.`,
            zh: `赢在全球。`,
            fr: `GAGNER À L'ÉCHELLE MONDIALE.`,
            ko: `글로벌 승리.`,
            es: `GANA A NIVEL GLOBAL.`,
            ja: `世界で勝つ。`,
            tr: `KÜRESEL KAZAN.`,
            vi: `CHIẾN THẮNG TOÀN CẦU.`,
            ru: `ПОБЕЖДАЙ ГЛОБАЛЬНО.`,
            de: `GLOBAL GEWINNEN.`,
            pt: `VENCE GLOBALMENTE.`,
            it: `VINCI GLOBALMENTE.`,
            ar: `اربح عالمياً.`,
            hi: `वैश्विक रूप से जीतें।`,
            pl: `WYGRYWAJ GLOBALNIE.`,
            nl: `WIN GLOBAAL.`
        },
        hero_subtitle: {
            en: `The first 100% client-side trading engine. No API keys. No server latency. NexusTools injects institutional-grade logic directly into your browser.`,
            zh: `首个百分之百客户端交易引擎。无需 API 密钥。没有服务器延迟。NexusTools 将机构级逻辑直接注入你的浏览器。`,
            fr: `Le premier moteur de trading 100 % côté client. Aucun API key. Aucune latence serveur. NexusTools injecte une logique de niveau institutionnel directement dans votre navigateur.`,
            ko: `최초의 100% 클라이언트측 트레이딩 엔진입니다. API 키가 필요 없습니다. 서버 지연도 없습니다. NexusTools 가 기관급 로직을 브라우저에 바로 주입합니다.`,
            es: `El primer motor de trading totalmente del lado del cliente. Sin claves API. Sin latencia de servidor. NexusTools inyecta lógica de nivel institucional directamente en tu navegador.`,
            ja: `初の100%クライアント側トレーディングエンジンです。APIキーは不要。サーバー遅延もありません。NexusTools が機関レベルのロジックをブラウザに直接注入します。`,
            tr: `Yüzde yüz istemci tarafında çalışan ilk alım satım motoru. API anahtarı yok. Sunucu gecikmesi yok. NexusTools kurumsal düzeydeki mantığı doğrudan tarayıcınıza enjekte eder.`,
            vi: `Công cụ giao dịch đầu tiên chạy hoàn toàn phía khách hàng. Không cần API key. Không có độ trễ máy chủ. NexusTools đưa logic chuẩn tổ chức thẳng vào trình duyệt của bạn.`,
            ru: `Первый 100% клиентский торговый движок. Без API ключей. Без задержек сервера. NexusTools внедряет логику институционального уровня прямо в ваш браузер.`,
            de: `Die erste 100% clientseitige Trading-Engine. Keine API-Schlüssel. Keine Server-Latenz. NexusTools injiziert institutionelle Logik direkt in Ihren Browser.`,
            pt: `O primeiro motor de trading 100% do lado do cliente. Sem chaves API. Sem latência do servidor. NexusTools injeta lógica de nível institucional diretamente no seu navegador.`,
            it: `Il primo motore di trading 100% lato client. Nessuna chiave API. Nessuna latenza del server. NexusTools inietta logica di livello istituzionale direttamente nel tuo browser.`,
            ar: `أول محرك تداول 100% من جانب العميل. بدون مفاتيح API. بدون زمن انتقال للخادم. NexusTools يحقن منطقًا على مستوى المؤسسات مباشرة في متصفحك.`,
            hi: `पहला 100% क्लाइंट-साइड ट्रेडिंग इंजन। कोई API कुंजी नहीं। कोई सर्वर विलंब नहीं। NexusTools संस्थागत-स्तर का तर्क सीधे आपके ब्राउज़र में इंजेक्ट करता है।`,
            pl: `Pierwszy 100% silnik tradingowy po stronie klienta. Bez kluczy API. Bez opóźnień serwera. NexusTools wstrzykuje logikę na poziomie instytucjonalnym bezpośrednio do Twojej przeglądarki.`,
            nl: `De eerste 100% client-side trading engine. Geen API-sleutels. Geen serverlatentie. NexusTools injecteert logica op institutioneel niveau direct in uw browser.`
        },
        hero_pill_1: {
            en: `Client-Side Execution`,
            zh: `本地执行`,
            fr: `Exécution côté client`,
            ko: `클라이언트 측 실행`,
            es: `Ejecución del lado del cliente`,
            ja: `クライアント側実行`,
            tr: `İstemci tarafı yürütme`,
            vi: `Thực thi phía khách hàng`,
            ru: `Клиентское выполнение`,
            de: `Clientseitige Ausführung`,
            pt: `Execução do lado do cliente`,
            it: `Esecuzione lato client`,
            ar: `التنفيذ من جانب العميل`,
            hi: `क्लाइंट-साइड निष्पादन`,
            pl: `Wykonanie po stronie klienta`,
            nl: `Client-side uitvoering`
        },
        hero_pill_2: {
            en: `Zero API Keys`,
            zh: `无需 API 密钥`,
            fr: `Sans clé API`,
            ko: `API 키 불필요`,
            es: `Sin claves API`,
            ja: `API キー不要`,
            tr: `API anahtarı gerekmez`,
            vi: `Không cần API key`,
            ru: `Без API ключей`,
            de: `Keine API-Schlüssel`,
            pt: `Zero chaves API`,
            it: `Zero chiavi API`,
            ar: `صفر مفاتيح API`,
            hi: `शून्य API कुंजी`,
            pl: `Zero kluczy API`,
            nl: `Geen API-sleutels`
        },
        hero_pill_3: {
            en: `Stealth DOM Automation`,
            zh: `隐身 DOM 自动化`,
            fr: `Automatisation DOM furtive`,
            ko: `스텔스 DOM 자동화`,
            es: `Automatización DOM sigilosa`,
            ja: `ステルス DOM 自動化`,
            tr: `Gizli DOM otomasyonu`,
            vi: `Tự động hóa DOM ẩn`,
            ru: `Скрытая автоматизация DOM`,
            de: `Getarnte DOM-Automatisierung`,
            pt: `Automação DOM furtiva`,
            it: `Automazione DOM stealth`,
            ar: `أتمتة DOM خفية`,
            hi: `स्टील्थ DOM स्वचालन`,
            pl: `Automatyzacja DOM w trybie ukrytym`,
            nl: `Stealth DOM-automatisering`
        },
        hero_primary_cta: {
            en: `Watch Demo`,
            zh: `观看演示`,
            fr: `Voir la démo`,
            ko: `데모 보기`,
            es: `Ver demo`,
            ja: `デモを見る`,
            tr: `Demoyu izle`,
            vi: `Xem demo`,
            ru: `Смотреть демо`,
            de: `Demo ansehen`,
            pt: `Assistir demonstração`,
            it: `Guarda demo`,
            ar: `شاهد العرض التوضيحي`,
            hi: `डेमो देखें`,
            pl: `Obejrzyj demo`,
            nl: `Bekijk demo`
        },
        hero_secondary_cta: {
            en: `Setup in 30s`,
            zh: `30 秒完成设置`,
            fr: `Configuration en 30 s`,
            ko: `30초 설정`,
            es: `Configura en 30 s`,
            ja: `30秒でセットアップ`,
            tr: `30 saniyede kur`,
            vi: `Thiết lập trong 30 giây`,
            ru: `Настройка за 30 сек`,
            de: `Einrichtung in 30s`,
            pt: `Configuração em 30s`,
            it: `Configurazione in 30s`,
            ar: `الإعداد في 30 ثانية`,
            hi: `30 सेकंड में सेटअप`,
            pl: `Konfiguracja w 30s`,
            nl: `Instellen in 30s`
        },
        hero_trust_badge: {
            en: `Client-Side Verified`,
            zh: `客户端验证`,
            fr: `Validé côté client`,
            ko: `클라이언트 인증`,
            es: `Verificado en cliente`,
            ja: `クライアント側で検証済み`,
            tr: `İstemci tarafında doğrulandı`,
            vi: `Xác minh phía khách hàng`,
            ru: `Проверено на клиенте`,
            de: `Clientseitig verifiziert`,
            pt: `Verificado no cliente`,
            it: `Verificato lato client`,
            ar: `تم التحقق من جانب العميل`,
            hi: `क्लाइंट-साइड सत्यापित`,
            pl: `Zweryfikowane po stronie klienta`,
            nl: `Client-side geverifieerd`
        },
        hero_chip_local: {
            en: `Local node`,
            zh: `本地节点`,
            fr: `Nœud local`,
            ko: `로컬 노드`,
            es: `Nodo local`,
            ja: `ローカルノード`,
            tr: `Yerel düğüm`,
            vi: `Nút cục bộ`,
            ru: `Локальный узел`,
            de: `Lokaler Knoten`,
            pt: `Nó local`,
            it: `Nodo locale`,
            ar: `عقدة محلية`,
            hi: `स्थानीय नोड`,
            pl: `Węzeł lokalny`,
            nl: `Lokale node`
        },
        hero_chip_stealth: {
            en: `Stealth verified`,
            zh: `隐身校验完成`,
            fr: `Mode furtif validé`,
            ko: `스텔스 검증 완료`,
            es: `Sigilo verificado`,
            ja: `ステルス検証済み`,
            tr: `Gizlilik doğrulandı`,
            vi: `Đã xác thực chế độ ẩn`,
            ru: `Скрытность проверена`,
            de: `Tarnung verifiziert`,
            pt: `Furtividade verificada`,
            it: `Stealth verificato`,
            ar: `تم التحقق من التخفي`,
            hi: `स्टील्थ सत्यापित`,
            pl: `Tryb ukryty zweryfikowany`,
            nl: `Stealth geverifieerd`
        },
        hero_metric_latency_label: {
            en: `Latency`,
            zh: `延迟`,
            fr: `Latence`,
            ko: `지연`,
            es: `Latencia`,
            ja: `レイテンシ`,
            tr: `Gecikme`,
            vi: `Độ trễ`,
            ru: `Задержка`,
            de: `Latenz`,
            pt: `Latência`,
            it: `Latenza`,
            ar: `زمن الانتقال`,
            hi: `विलंब`,
            pl: `Opóźnienie`,
            nl: `Latentie`
        },
        hero_metric_latency_change: {
            en: `↑ 38% faster`,
            zh: `↑ 快 38%`,
            fr: `↑ 38 % plus rapide`,
            ko: `↑ 38% 더 빠름`,
            es: `↑ 38 % más rápido`,
            ja: `↑ 38% 高速`,
            tr: `↑ %38 daha hızlı`,
            vi: `↑ Nhanh hơn 38%`,
            ru: `↑ на 38% быстрее`,
            de: `↑ 38% schneller`,
            pt: `↑ 38% mais rápido`,
            it: `↑ 38% più veloce`,
            ar: `↑ أسرع بنسبة 38%`,
            hi: `↑ 38% तेज़`,
            pl: `↑ 38% szybciej`,
            nl: `↑ 38% sneller`
        },
        hero_metric_fill_label: {
            en: `Fill rate`,
            zh: `成交率`,
            fr: `Taux d’exécution`,
            ko: `체결률`,
            es: `Tasa de llenado`,
            ja: `約定率`,
            tr: `Dolum oranı`,
            vi: `Tỷ lệ khớp lệnh`,
            ru: `Процент заполнения`,
            de: `Füllrate`,
            pt: `Taxa de preenchimento`,
            it: `Tasso di riempimento`,
            ar: `معدل التعبئة`,
            hi: `भरण दर`,
            pl: `Wskaźnik wypełnienia`,
            nl: `Vulpercentage`
        },
        hero_metric_fill_change: {
            en: `last 72 trades`,
            zh: `最近 72 笔`,
            fr: `72 dernières opérations`,
            ko: `최근 72건`,
            es: `Últimas 72 operaciones`,
            ja: `直近72件`,
            tr: `Son 72 işlem`,
            vi: `72 giao dịch gần nhất`,
            ru: `последние 72 сделки`,
            de: `letzte 72 Trades`,
            pt: `últimas 72 negociações`,
            it: `ultimi 72 scambi`,
            ar: `آخر 72 صفقة`,
            hi: `अंतिम 72 ट्रेड`,
            pl: `ostatnie 72 transakcje`,
            nl: `laatste 72 trades`
        },
        hero_metric_blocks_label: {
            en: `Order blocks`,
            zh: `挂单块`,
            fr: `Blocs d’ordre`,
            ko: `주문 블록`,
            es: `Bloques de órdenes`,
            ja: `オーダーブロック`,
            tr: `Emir blokları`,
            vi: `Khối lệnh`,
            ru: `Блоки заказов`,
            de: `Order-Blöcke`,
            pt: `Blocos de ordens`,
            it: `Blocchi ordini`,
            ar: `كتل الطلبات`,
            hi: `ऑर्डर ब्लॉक`,
            pl: `Bloki zamówień`,
            nl: `Orderblokken`
        },
        hero_metric_blocks_change: {
            en: `+3 armed`,
            zh: `+3 已武装`,
            fr: `+3 armés`,
            ko: `+3 준비`,
            es: `+3 armados`,
            ja: `+3 準備完了`,
            tr: `+3 hazır`,
            vi: `+3 đã kích hoạt`,
            ru: `+3 вооружено`,
            de: `+3 bewaffnet`,
            pt: `+3 armados`,
            it: `+3 armati`,
            ar: `+3 مسلح`,
            hi: `+3 सशस्त्र`,
            pl: `+3 uzbrojone`,
            nl: `+3 bewapend`
        },
        hero_metric_pnl_label: {
            en: `PnL sync`,
            zh: `收益同步`,
            fr: `Synchronisation PnL`,
            ko: `손익 동기화`,
            es: `Sincronización PnL`,
            ja: `損益同期`,
            tr: `Kar zarar senkronu`,
            vi: `Đồng bộ PnL`,
            ru: `Синхронизация PnL`,
            de: `PnL-Synchronisation`,
            pt: `Sincronização PnL`,
            it: `Sincronizzazione PnL`,
            ar: `مزامنة الربح والخسارة`,
            hi: `PnL सिंक`,
            pl: `Synchronizacja PnL`,
            nl: `PnL-synchronisatie`
        },
        hero_metric_pnl_change: {
            en: `24h realized`,
            zh: `24 小时已实现`,
            fr: `24 h réalisés`,
            ko: `24시간 실현`,
            es: `24 h realizados`,
            ja: `24時間の実現益`,
            tr: `24 saatte gerçekleşen`,
            vi: `Đã chốt 24h`,
            ru: `реализовано за 24ч`,
            de: `24h realisiert`,
            pt: `24h realizados`,
            it: `24h realizzati`,
            ar: `محقق خلال 24 ساعة`,
            hi: `24 घंटे में प्राप्त`,
            pl: `zrealizowane w 24h`,
            nl: `24u gerealiseerd`
        },
        hero_footer_left: {
            en: `Command queue: 03 live`,
            zh: `命令队列：03 个实时`,
            fr: `File de commandes : 03 actives`,
            ko: `명령 큐: 03 실시간`,
            es: `Cola de comandos: 03 activas`,
            ja: `コマンド待ち行列: 03 稼働中`,
            tr: `Komut kuyruğu: 03 canlı`,
            vi: `Hàng lệnh: 03 đang chạy`,
            ru: `Очередь команд: 03 активны`,
            de: `Befehls-Warteschlange: 03 live`,
            pt: `Fila de comandos: 03 ativos`,
            it: `Coda comandi: 03 attivi`,
            ar: `قائمة الانتظار للأوامر: 03 نشطة`,
            hi: `कमांड कतार: 03 लाइव`,
            pl: `Kolejka poleceń: 03 aktywne`,
            nl: `Commando-wachtrij: 03 actief`
        },
        hero_footer_right: {
            en: `Uptime 24/7 · Zero API keys`,
            zh: `全天候在线 · 零 API 密钥`,
            fr: `Disponibilité 24/7 · Zéro clé API`,
            ko: `연중무휴 가동 · API 키 없음`,
            es: `Disponibilidad 24/7 · Cero claves API`,
            ja: `24時間稼働 · API キー不要`,
            tr: `7/24 çalışma · API anahtarı yok`,
            vi: `Hoạt động 24/7 · Không cần API key`,
            ru: `Работает 24/7 · Без API ключей`,
            de: `Betriebszeit 24/7 · Keine API-Schlüssel`,
            pt: `Tempo de atividade 24/7 · Zero chaves API`,
            it: `Tempo di attività 24/7 · Zero chiavi API`,
            ar: `وقت التشغيل 24/7 · صفر مفاتيح API`,
            hi: `अपटाइम 24/7 · शून्य API कुंजी`,
            pl: `Czas pracy 24/7 · Zero kluczy API`,
            nl: `Uptime 24/7 · Geen API-sleutels`
        },
        bookmarklet_hint: {
            en: `Drag to Bookmarks Bar`,
            zh: `拖到书签栏`,
            fr: `Glissez vers la barre de favoris`,
            ko: `책갈피 막대로 끌어다 놓기`,
            es: `Arrastra a la barra de marcadores`,
            ja: `ブックマークバーにドラッグ`,
            tr: `Yer imleri çubuğuna sürükleyin`,
            vi: `Kéo vào thanh dấu trang`,
            ru: `Перетащите на панель закладок`,
            de: `Zur Lesezeichenleiste ziehen`,
            pt: `Arraste para a barra de favoritos`,
            it: `Trascina nella barra dei segnalibri`,
            ar: `اسحب إلى شريط الإشارات المرجعية`,
            hi: `बुकमार्क बार पर खींचें`,
            pl: `Przeciągnij do paska zakładek`,
            nl: `Sleep naar de bladwijzerbalk`
        },
        bookmarklet_title: {
            en: `Zero API Keys Required`,
            zh: `无需 API 密钥`,
            fr: `Aucune clé API requise`,
            ko: `API 키가 필요 없습니다`,
            es: `No se requieren claves API`,
            ja: `API キー不要`,
            tr: `API anahtarı gerekmiyor`,
            vi: `Không cần API key`,
            ru: `API ключи не требуются`,
            de: `Keine API-Schlüssel erforderlich`,
            pt: `Zero chaves API necessárias`,
            it: `Zero chiavi API richieste`,
            ar: `لا حاجة لمفاتيح API`,
            hi: `शून्य API कुंजी आवश्यक`,
            pl: `Zero kluczy API wymagane`,
            nl: `Geen API-sleutels vereist`
        },
        bookmarklet_desc: {
            en: `Runs entirely in your browser memory.`,
            zh: `完全运行在浏览器内存中。`,
            fr: `Fonctionne entièrement dans la mémoire de votre navigateur.`,
            ko: `모든 작업이 브라우저 메모리에서 수행됩니다.`,
            es: `Se ejecuta por completo en la memoria de tu navegador.`,
            ja: `すべてブラウザメモリ内で動作します。`,
            tr: `Tamamen tarayıcı belleğinizde çalışır.`,
            vi: `Chạy hoàn toàn trong bộ nhớ trình duyệt.`,
            ru: `Работает полностью в памяти вашего браузера.`,
            de: `Läuft vollständig im Browser-Speicher.`,
            pt: `Executa inteiramente na memória do seu navegador.`,
            it: `Funziona interamente nella memoria del tuo browser.`,
            ar: `يعمل بالكامل في ذاكرة متصفحك.`,
            hi: `पूरी तरह से आपके ब्राउज़र की मेमोरी में चलता है।`,
            pl: `Działa całkowicie w pamięci Twojej przeglądarki.`,
            nl: `Draait volledig in het geheugen van uw browser.`
        },
        hero_signal_latency_label: {
            en: `Latency Mode`,
            zh: `延迟模式`,
            fr: `Mode latence`,
            ko: `지연 모드`,
            es: `Modo de latencia`,
            ja: `レイテンシモード`,
            tr: `Gecikme modu`,
            vi: `Chế độ độ trễ`,
            ru: `Режим задержки`,
            de: `Latenz-Modus`,
            pt: `Modo de latência`,
            it: `Modalità latenza`,
            ar: `وضع زمن الانتقال`,
            hi: `विलंब मोड`,
            pl: `Tryb opóźnienia`,
            nl: `Latentiemodus`
        },
        hero_signal_latency_value: {
            en: `Photon · 3.8ms`,
            zh: `Photon · 3.8ms`,
            fr: `Photon · 3,8 ms`,
            ko: `Photon · 3.8ms`,
            es: `Photon · 3,8 ms`,
            ja: `Photon · 3.8ms`,
            tr: `Photon · 3.8ms`,
            vi: `Photon · 3,8ms`,
            ru: `Фотон · 3.8мс`,
            de: `Photon · 3.8ms`,
            pt: `Photon · 3.8ms`,
            it: `Photon · 3.8ms`,
            ar: `Photon · 3.8ms`,
            hi: `Photon · 3.8ms`,
            pl: `Photon · 3.8ms`,
            nl: `Photon · 3.8ms`
        },
        hero_signal_failsafe_label: {
            en: `Fail-safes`,
            zh: `保护层`,
            fr: `Sécurités`,
            ko: `보호 장치`,
            es: `Capas de seguridad`,
            ja: `フェイルセーフ`,
            tr: `Güvenlik katmanları`,
            vi: `Tầng bảo vệ`,
            ru: `Защита от сбоев`,
            de: `Sicherheitsmechanismen`,
            pt: `Mecanismos de segurança`,
            it: `Meccanismi di sicurezza`,
            ar: `آليات الأمان`,
            hi: `सुरक्षा तंत्र`,
            pl: `Mechanizmy bezpieczeństwa`,
            nl: `Veiligheidsmechanismen`
        },
        hero_signal_failsafe_value: {
            en: `Redundant · 4 layers`,
            zh: `冗余 · 4 层`,
            fr: `Redondant · 4 couches`,
            ko: `중복 · 4단`,
            es: `Redundante · 4 capas`,
            ja: `冗長構成 · 4層`,
            tr: `Yedekli · 4 katman`,
            vi: `Dự phòng · 4 lớp`,
            ru: `Избыточность · 4 слоя`,
            de: `Redundant · 4 Schichten`,
            pt: `Redundante · 4 camadas`,
            it: `Ridondante · 4 livelli`,
            ar: `مكرر · 4 طبقات`,
            hi: `अतिरेक · 4 परतें`,
            pl: `Nadmiarowe · 4 warstwy`,
            nl: `Redundant · 4 lagen`
        },
        hero_signal_cycle_label: {
            en: `Automation Cycle`,
            zh: `自动化频率`,
            fr: `Cycle d’automatisation`,
            ko: `자동화 주기`,
            es: `Ciclo de automatización`,
            ja: `自動化サイクル`,
            tr: `Otomasyon döngüsü`,
            vi: `Chu kỳ tự động`,
            ru: `Цикл автоматизации`,
            de: `Automatisierungszyklus`,
            pt: `Ciclo de automação`,
            it: `Ciclo di automazione`,
            ar: `دورة الأتمتة`,
            hi: `स्वचालन चक्र`,
            pl: `Cykl automatyzacji`,
            nl: `Automatiseringscyclus`
        },
        hero_signal_cycle_value: {
            en: `12 signals / min`,
            zh: `每分钟 12 条信号`,
            fr: `12 signaux / min`,
            ko: `분당 12개 신호`,
            es: `12 señales / min`,
            ja: `毎分12シグナル`,
            tr: `Dakikada 12 sinyal`,
            vi: `12 tín hiệu / phút`,
            ru: `12 сигналов / мин`,
            de: `12 Signale / min`,
            pt: `12 sinais / min`,
            it: `12 segnali / min`,
            ar: `12 إشارة / دقيقة`,
            hi: `12 संकेत / मिनट`,
            pl: `12 sygnałów / min`,
            nl: `12 signalen / min`
        },
        demo_header_main: {
            en: `Tactical Briefing // Live Demo`,
            zh: `战术通报 // 实时演示`,
            fr: `Briefing tactique // Démo live`,
            ko: `전술 브리핑 // 라이브 데모`,
            es: `Informe táctico // Demo en vivo`,
            ja: `戦術ブリーフィング // ライブデモ`,
            tr: `Taktik brifing // Canlı demo`,
            vi: `Thông báo chiến thuật // Demo trực tiếp`,
            ru: `Тактический брифинг // Живое демо`,
            de: `Taktisches Briefing // Live-Demo`,
            pt: `Briefing tático // Demo ao vivo`,
            it: `Briefing tattico // Demo live`,
            ar: `إحاطة تكتيكية // عرض توضيحي مباشر`,
            hi: `सामरिक ब्रीफिंग // लाइव डेमो`,
            pl: `Briefing taktyczny // Demo na żywo`,
            nl: `Tactische briefing // Live demo`
        },
        demo_header_status: {
            en: `Secure Connection Established`,
            zh: `安全连接已建立`,
            fr: `Connexion sécurisée établie`,
            ko: `보안 연결 완료`,
            es: `Conexión segura establecida`,
            ja: `安全な接続を確立`,
            tr: `Güvenli bağlantı kuruldu`,
            vi: `Đã thiết lập kết nối an toàn`,
            ru: `Безопасное соединение установлено`,
            de: `Sichere Verbindung hergestellt`,
            pt: `Conexão segura estabelecida`,
            it: `Connessione sicura stabilita`,
            ar: `تم إنشاء اتصال آمن`,
            hi: `सुरक्षित कनेक्शन स्थापित`,
            pl: `Bezpieczne połączenie nawiązane`,
            nl: `Beveiligde verbinding tot stand gebracht`
        },
        demo_overlay_text: {
            en: `&gt; Watch Installation Sequence<br>&gt; Duration: 00:15 // Status: Encrypted`,
            zh: `&gt; 查看安装过程<br>&gt; 时长 00:15 // 状态 加密`,
            fr: `&gt; Voir la séquence d’installation<br>&gt; Durée : 00:15 // Statut : Chiffré`,
            ko: `&gt; 설치 순서 보기<br>&gt; 소요 시간 00:15 // 상태 암호화`,
            es: `&gt; Ver secuencia de instalación<br>&gt; Duración: 00:15 // Estado: Cifrado`,
            ja: `&gt; インストール手順を表示<br>&gt; 所要 00:15 // 状態 暗号化`,
            tr: `&gt; Kurulum sırasını izle<br>&gt; Süre: 00:15 // Durum: Şifreli`,
            vi: `&gt; Xem chuỗi cài đặt<br>&gt; Thời lượng: 00:15 // Trạng thái: Mã hóa`,
            ru: `&gt; Смотреть последовательность установки<br>&gt; Длительность: 00:15 // Статус: Зашифровано`,
            de: `&gt; Installationssequenz ansehen<br>&gt; Dauer: 00:15 // Status: Verschlüsselt`,
            pt: `&gt; Assistir sequência de instalação<br>&gt; Duração: 00:15 // Status: Criptografado`,
            it: `&gt; Guarda sequenza di installazione<br>&gt; Durata: 00:15 // Stato: Crittografato`,
            ar: `&gt; شاهد تسلسل التثبيت<br>&gt; المدة: 00:15 // الحالة: مشفر`,
            hi: `&gt; इंस्टॉलेशन अनुक्रम देखें<br>&gt; अवधि: 00:15 // स्थिति: एन्क्रिप्टेड`,
            pl: `&gt; Obejrzyj sekwencję instalacji<br>&gt; Czas trwania: 00:15 // Status: Zaszyfrowane`,
            nl: `&gt; Bekijk installatiesequentie<br>&gt; Duur: 00:15 // Status: Versleuteld`
        },
        demo_stat_system_label: {
            en: `System`,
            zh: `系统`,
            fr: `Système`,
            ko: `시스템`,
            es: `Sistema`,
            ja: `システム`,
            tr: `Sistem`,
            vi: `Hệ thống`,
            ru: `Система`,
            de: `System`,
            pt: `Sistema`,
            it: `Sistema`,
            ar: `النظام`,
            hi: `सिस्टम`,
            pl: `System`,
            nl: `Systeem`
        },
        demo_stat_system_value: {
            en: `Hyperliquid DEX`,
            zh: `Hyperliquid DEX`,
            fr: `Hyperliquid DEX`,
            ko: `Hyperliquid DEX`,
            es: `Hyperliquid DEX`,
            ja: `Hyperliquid DEX`,
            tr: `Hyperliquid DEX`,
            vi: `Hyperliquid DEX`,
            ru: `Hyperliquid DEX`,
            de: `Hyperliquid DEX`,
            pt: `Hyperliquid DEX`,
            it: `Hyperliquid DEX`,
            ar: `Hyperliquid DEX`,
            hi: `Hyperliquid DEX`,
            pl: `Hyperliquid DEX`,
            nl: `Hyperliquid DEX`
        },
        demo_stat_mode_label: {
            en: `Mode`,
            zh: `模式`,
            fr: `Mode`,
            ko: `모드`,
            es: `Modo`,
            ja: `モード`,
            tr: `Mod`,
            vi: `Chế độ`,
            ru: `Режим`,
            de: `Modus`,
            pt: `Modo`,
            it: `Modalità`,
            ar: `الوضع`,
            hi: `मोड`,
            pl: `Tryb`,
            nl: `Modus`
        },
        demo_stat_mode_value: {
            en: `Bookmarklet`,
            zh: `书签脚本`,
            fr: `Bookmarklet`,
            ko: `북마클릿`,
            es: `Bookmarklet`,
            ja: `ブックマークレット`,
            tr: `Bookmarklet`,
            vi: `Bookmarklet`,
            ru: `Букмарклет`,
            de: `Bookmarklet`,
            pt: `Bookmarklet`,
            it: `Bookmarklet`,
            ar: `إشارة مرجعية`,
            hi: `बुकमार्कलेट`,
            pl: `Bookmarklet`,
            nl: `Bookmarklet`
        },
        demo_stat_latency_label: {
            en: `Latency`,
            zh: `延迟`,
            fr: `Latence`,
            ko: `지연`,
            es: `Latencia`,
            ja: `レイテンシ`,
            tr: `Gecikme`,
            vi: `Độ trễ`,
            ru: `Задержка`,
            de: `Latenz`,
            pt: `Latência`,
            it: `Latenza`,
            ar: `زمن الانتقال`,
            hi: `विलंब`,
            pl: `Opóźnienie`,
            nl: `Latentie`
        },
        demo_stat_latency_value: {
            en: `4ms`,
            zh: `4ms`,
            fr: `4 ms`,
            ko: `4ms`,
            es: `4 ms`,
            ja: `4ms`,
            tr: `4 ms`,
            vi: `4ms`,
            ru: `4мс`,
            de: `4ms`,
            pt: `4ms`,
            it: `4ms`,
            ar: `4ms`,
            hi: `4ms`,
            pl: `4ms`,
            nl: `4ms`
        },
        demo_stat_status_label: {
            en: `Status`,
            zh: `状态`,
            fr: `Statut`,
            ko: `상태`,
            es: `Estado`,
            ja: `ステータス`,
            tr: `Durum`,
            vi: `Trạng thái`,
            ru: `Статус`,
            de: `Status`,
            pt: `Status`,
            it: `Stato`,
            ar: `الحالة`,
            hi: `स्थिति`,
            pl: `Status`,
            nl: `Status`
        },
        demo_stat_status_value: {
            en: `Live Tracking`,
            zh: `实时跟踪`,
            fr: `Suivi en direct`,
            ko: `실시간 추적`,
            es: `Seguimiento en vivo`,
            ja: `ライブトラッキング`,
            tr: `Canlı izleme`,
            vi: `Theo dõi trực tiếp`,
            ru: `Живое отслеживание`,
            de: `Live-Tracking`,
            pt: `Rastreamento ao vivo`,
            it: `Tracciamento live`,
            ar: `تتبع مباشر`,
            hi: `लाइव ट्रैकिंग`,
            pl: `Śledzenie na żywo`,
            nl: `Live tracking`
        },
        setup_tag: {
            en: `Quick Setup · 30s`,
            zh: `快速设置 · 30 秒`,
            fr: `Installation rapide · 30 s`,
            ko: `빠른 설정 · 30초`,
            es: `Configuración rápida · 30 s`,
            ja: `クイックセットアップ · 30秒`,
            tr: `Hızlı kurulum · 30 sn`,
            vi: `Thiết lập nhanh · 30 giây`,
            ru: `Быстрая настройка · 30 сек`,
            de: `Schnelle Einrichtung · 30s`,
            pt: `Configuração rápida · 30s`,
            it: `Configurazione rapida · 30s`,
            ar: `إعداد سريع · 30 ثانية`,
            hi: `त्वरित सेटअप · 30s`,
            pl: `Szybka konfiguracja · 30s`,
            nl: `Snelle installatie · 30s`
        },
        setup_title: {
            en: `Ready in four simple steps`,
            zh: `四个简单步骤即可开始`,
            fr: `Prêt en quatre étapes simples`,
            ko: `네 단계면 준비 완료`,
            es: `Listo en cuatro pasos simples`,
            ja: `4つの簡単なステップで準備完了`,
            tr: `Dört basit adımda hazırsınız`,
            vi: `Hoàn tất sau bốn bước đơn giản`,
            ru: `Готово в четыре простых шага`,
            de: `Bereit in vier einfachen Schritten`,
            pt: `Pronto em quatro passos simples`,
            it: `Pronto in quattro semplici passaggi`,
            ar: `جاهز في أربع خطوات بسيطة`,
            hi: `चार सरल चरणों में तैयार`,
            pl: `Gotowe w czterech prostych krokach`,
            nl: `Klaar in vier eenvoudige stappen`
        },
        setup_subtitle: {
            en: `No terminals, keys, or config files. Follow the checklist below and NexusTools will be live inside Hyperliquid in under a minute.`,
            zh: `无需终端无需密钥也不需要配置文件。按照下方清单操作不到一分钟即可在 Hyperliquid 中启用 NexusTools。`,
            fr: `Aucun terminal, aucune clé ni fichier de configuration. Suivez la liste ci-dessous et NexusTools sera actif dans Hyperliquid en moins d’une minute.`,
            ko: `터미널도 키도 설정 파일도 필요 없습니다. 아래 체크리스트를 따르면 1분 안에 Hyperliquid 안에서 NexusTools 가 실행됩니다.`,
            es: `Sin terminales, sin claves y sin archivos de configuración. Sigue la lista y NexusTools estará activo en Hyperliquid en menos de un minuto.`,
            ja: `ターミナルもキーも設定ファイルも不要です。以下のチェックリストに従えば 1 分かからずに Hyperliquid 内で NexusTools が起動します。`,
            tr: `Terminale, anahtara veya yapılandırma dosyasına gerek yok. Aşağıdaki kontrol listesini izleyin ve bir dakikadan kısa sürede NexusTools Hyperliquid içinde çalışsın.`,
            vi: `Không cần terminal, không cần key và không cần file cấu hình. Làm theo danh sách bên dưới là NexusTools chạy trong Hyperliquid chỉ sau dưới một phút.`,
            ru: `Без терминалов, ключей или конфигурационных файлов. Следуйте чек-листу ниже, и NexusTools будет работать внутри Hyperliquid менее чем за минуту.`,
            de: `Keine Terminals, Schlüssel oder Konfigurationsdateien. Befolgen Sie die Checkliste unten und NexusTools wird in weniger als einer Minute in Hyperliquid live sein.`,
            pt: `Sem terminais, chaves ou arquivos de configuração. Siga a lista de verificação abaixo e o NexusTools estará ativo no Hyperliquid em menos de um minuto.`,
            it: `Nessun terminale, chiavi o file di configurazione. Segui la checklist qui sotto e NexusTools sarà attivo in Hyperliquid in meno di un minuto.`,
            ar: `بدون محطات طرفية أو مفاتيح أو ملفات تكوين. اتبع قائمة التحقق أدناه وسيكون NexusTools نشطًا داخل Hyperliquid في أقل من دقيقة.`,
            hi: `कोई टर्मिनल, कुंजी या कॉन्फ़िग फ़ाइलें नहीं। नीचे दी गई चेकलिस्ट का पालन करें और NexusTools एक मिनट से कम समय में Hyperliquid के अंदर लाइव होगा।`,
            pl: `Bez terminali, kluczy ani plików konfiguracyjnych. Postępuj zgodnie z listą kontrolną poniżej, a NexusTools będzie działać w Hyperliquid w mniej niż minutę.`,
            nl: `Geen terminals, sleutels of configuratiebestanden. Volg de checklist hieronder en NexusTools zal binnen een minuut actief zijn in Hyperliquid.`
        },
        setup_card1_title: {
            en: `Open your bookmarks bar`,
            zh: `打开书签栏`,
            fr: `Ouvrez votre barre de favoris`,
            ko: `북마크 바를 여세요`,
            es: `Abre la barra de marcadores`,
            ja: `ブックマークバーを開く`,
            tr: `Yer imleri çubuğunu aç`,
            vi: `Mở thanh dấu trang`,
            ru: `Откройте панель закладок`,
            de: `Öffnen Sie Ihre Lesezeichenleiste`,
            pt: `Abra a barra de favoritos`,
            it: `Apri la barra dei segnalibri`,
            ar: `افتح شريط الإشارات المرجعية`,
            hi: `अपनी बुकमार्क बार खोलें`,
            pl: `Otwórz pasek zakładek`,
            nl: `Open uw bladwijzerbalk`
        },
        setup_card1_windows: {
            en: `Windows`,
            zh: `Windows`,
            fr: `Windows`,
            ko: `Windows`,
            es: `Windows`,
            ja: `Windows`,
            tr: `Windows`,
            vi: `Windows`,
            ru: `Windows`,
            de: `Windows`,
            pt: `Windows`,
            it: `Windows`,
            ar: `Windows`,
            hi: `Windows`,
            pl: `Windows`,
            nl: `Windows`
        },
        setup_card1_windows_note: {
            en: `Keep the bar showing.`,
            zh: `保持可见。`,
            fr: `Laissez la barre visible.`,
            ko: `항상 보이도록 유지하세요.`,
            es: `Déjala visible.`,
            ja: `表示したままにします。`,
            tr: `Çubuğu görünür bırakın.`,
            vi: `Giữ thanh luôn hiển thị.`,
            ru: `Держите панель видимой.`,
            de: `Lassen Sie die Leiste sichtbar.`,
            pt: `Mantenha a barra visível.`,
            it: `Mantieni la barra visibile.`,
            ar: `أبقِ الشريط مرئيًا.`,
            hi: `बार दिखाई रखें।`,
            pl: `Zachowaj pasek widoczny.`,
            nl: `Houd de balk zichtbaar.`
        },
        setup_card1_mac: {
            en: `Mac`,
            zh: `Mac`,
            fr: `Mac`,
            ko: `Mac`,
            es: `Mac`,
            ja: `Mac`,
            tr: `Mac`,
            vi: `Mac`,
            ru: `Mac`,
            de: `Mac`,
            pt: `Mac`,
            it: `Mac`,
            ar: `Mac`,
            hi: `Mac`,
            pl: `Mac`,
            nl: `Mac`
        },
        setup_card1_mac_note: {
            en: `Toggle the bookmarks bar.`,
            zh: `切换书签栏显示。`,
            fr: `Affichez ou masquez la barre.`,
            ko: `북마크 바를 토글하세요.`,
            es: `Activa o desactiva la barra.`,
            ja: `ブックマークバーを切り替えます。`,
            tr: `Yer imleri çubuğunu açıp kapatın.`,
            vi: `Bật tắt thanh dấu trang.`,
            ru: `Переключите панель закладок.`,
            de: `Lesezeichenleiste umschalten.`,
            pt: `Ative ou desative a barra de favoritos.`,
            it: `Attiva o disattiva la barra dei segnalibri.`,
            ar: `قم بتبديل شريط الإشارات المرجعية.`,
            hi: `बुकमार्क बार टॉगल करें।`,
            pl: `Przełącz pasek zakładek.`,
            nl: `Schakel de bladwijzerbalk in/uit.`
        },
        setup_card1_note: {
            en: `The NexusTools button stays in your bookmarks bar for one-click access.`,
            zh: `NexusTools 按钮将保留在书签栏便于一键调用。`,
            fr: `Le bouton NexusTools reste dans votre barre de favoris pour un accès immédiat.`,
            ko: `NexusTools 버튼이 북마크 바에 고정되어 한 번에 실행됩니다.`,
            es: `El botón de NexusTools permanece en la barra para un acceso de un clic.`,
            ja: `NexusTools ボタンがブックマークバーに残りワンクリックで起動できます。`,
            tr: `NexusTools düğmesi tek tıkla erişim için yer imleri çubuğunda kalır.`,
            vi: `Nút NexusTools luôn có trên thanh dấu trang để truy cập một chạm.`,
            ru: `Кнопка NexusTools остается в панели закладок для доступа одним кликом.`,
            de: `Die NexusTools-Schaltfläche bleibt in Ihrer Lesezeichenleiste für Ein-Klick-Zugriff.`,
            pt: `O botão NexusTools permanece na barra de favoritos para acesso com um clique.`,
            it: `Il pulsante NexusTools rimane nella barra dei segnalibri per l'accesso con un clic.`,
            ar: `يبقى زر NexusTools في شريط الإشارات المرجعية للوصول بنقرة واحدة.`,
            hi: `NexusTools बटन एक-क्लिक पहुंच के लिए आपकी बुकमार्क बार में रहता है।`,
            pl: `Przycisk NexusTools pozostaje na pasku zakładek dla dostępu jednym kliknięciem.`,
            nl: `De NexusTools-knop blijft in uw bladwijzerbalk voor toegang met één klik.`
        },
        setup_card2_title: {
            en: `Drag the NexusTools button`,
            zh: `拖动 NexusTools 按钮`,
            fr: `Faites glisser le bouton NexusTools`,
            ko: `NexusTools 버튼을 끌어 놓으세요`,
            es: `Arrastra el botón de NexusTools`,
            ja: `NexusTools ボタンをドラッグ`,
            tr: `NexusTools düğmesini sürükleyin`,
            vi: `Kéo nút NexusTools`,
            ru: `Перетащите кнопку NexusTools`,
            de: `Ziehen Sie die NexusTools-Schaltfläche`,
            pt: `Arraste o botão NexusTools`,
            it: `Trascina il pulsante NexusTools`,
            ar: `اسحب زر NexusTools`,
            hi: `NexusTools बटन खींचें`,
            pl: `Przeciągnij przycisk NexusTools`,
            nl: `Sleep de NexusTools-knop`
        },
        setup_card2_desc: {
            en: `Grab the "NEXUSTOOLS v1.0" bookmarklet from the hero section and drop it onto the bar.`,
            zh: `从顶部区域拖拽 “NEXUSTOOLS v1.0” 书签到书签栏。`,
            fr: `Prenez le bookmarklet "NEXUSTOOLS v1.0" dans le hero et déposez-le sur la barre.`,
            ko: `히어로 섹션에서 "NEXUSTOOLS v1.0" 북마클릿을 끌어 북마크 바에 놓으세요.`,
            es: `Toma el bookmarklet "NEXUSTOOLS v1.0" del héroe y suéltalo en la barra.`,
            ja: `ヒーローセクションの "NEXUSTOOLS v1.0" をドラッグしてバーにドロップします。`,
            tr: `Hero bölümündeki "NEXUSTOOLS v1.0" bookmarkletini alıp çubuğa bırakın.`,
            vi: `Kéo bookmarklet "NEXUSTOOLS v1.0" ở phần đầu trang vào thanh dấu trang.`,
            ru: `Возьмите букмарклет "NEXUSTOOLS v1.0" из главной секции и перетащите его на панель.`,
            de: `Nehmen Sie das Bookmarklet "NEXUSTOOLS v1.0" aus dem Hero-Bereich und ziehen Sie es auf die Leiste.`,
            pt: `Pegue o bookmarklet "NEXUSTOOLS v1.0" da seção principal e solte-o na barra.`,
            it: `Prendi il bookmarklet "NEXUSTOOLS v1.0" dalla sezione hero e trascinalo sulla barra.`,
            ar: `التقط الإشارة المرجعية "NEXUSTOOLS v1.0" من القسم الرئيسي وأسقطها على الشريط.`,
            hi: `हीरो सेक्शन से "NEXUSTOOLS v1.0" बुकमार्कलेट लें और इसे बार पर ड्रॉप करें।`,
            pl: `Weź bookmarklet "NEXUSTOOLS v1.0" z sekcji hero i upuść go na pasek.`,
            nl: `Pak het bookmarklet "NEXUSTOOLS v1.0" uit de hero-sectie en sleep het naar de balk.`
        },
        setup_card3_title: {
            en: `Open Hyperliquid`,
            zh: `打开 Hyperliquid`,
            fr: `Ouvrez Hyperliquid`,
            ko: `Hyperliquid 를 여세요`,
            es: `Abre Hyperliquid`,
            ja: `Hyperliquid を開く`,
            tr: `Hyperliquid’i aç`,
            vi: `Mở Hyperliquid`,
            ru: `Откройте Hyperliquid`,
            de: `Hyperliquid öffnen`,
            pt: `Abrir Hyperliquid`,
            it: `Apri Hyperliquid`,
            ar: `افتح Hyperliquid`,
            hi: `Hyperliquid खोलें`,
            pl: `Otwórz Hyperliquid`,
            nl: `Open Hyperliquid`
        },
        setup_card3_desc: {
            en: `Navigate to <span style="color: var(--nexus-green); font-family: var(--font-mono);">app.hyperliquid.xyz</span> and sign in as usual.`,
            zh: `访问 <span style="color: var(--nexus-green); font-family: var(--font-mono);">app.hyperliquid.xyz</span> 并照常登录。`,
            fr: `Accédez à <span style="color: var(--nexus-green); font-family: var(--font-mono);">app.hyperliquid.xyz</span> et connectez-vous comme d’habitude.`,
            ko: `<span style="color: var(--nexus-green); font-family: var(--font-mono);">app.hyperliquid.xyz</span> 로 이동해 평소처럼 로그인하세요.`,
            es: `Ve a <span style="color: var(--nexus-green); font-family: var(--font-mono);">app.hyperliquid.xyz</span> y entra como siempre.`,
            ja: `<span style="color: var(--nexus-green); font-family: var(--font-mono);">app.hyperliquid.xyz</span> にアクセスしていつも通りログインします。`,
            tr: `<span style="color: var(--nexus-green); font-family: var(--font-mono);">app.hyperliquid.xyz</span> adresine gidip her zamanki gibi oturum açın.`,
            vi: `Truy cập <span style="color: var(--nexus-green); font-family: var(--font-mono);">app.hyperliquid.xyz</span> và đăng nhập như bình thường.`,
            ru: `Перейдите на <span style="color: var(--nexus-green); font-family: var(--font-mono);">app.hyperliquid.xyz</span> и войдите как обычно.`,
            de: `Navigieren Sie zu <span style="color: var(--nexus-green); font-family: var(--font-mono);">app.hyperliquid.xyz</span> und melden Sie sich wie gewohnt an.`,
            pt: `Navegue até <span style="color: var(--nexus-green); font-family: var(--font-mono);">app.hyperliquid.xyz</span> e faça login como de costume.`,
            it: `Naviga su <span style="color: var(--nexus-green); font-family: var(--font-mono);">app.hyperliquid.xyz</span> e accedi come al solito.`,
            ar: `انتقل إلى <span style="color: var(--nexus-green); font-family: var(--font-mono);">app.hyperliquid.xyz</span> وقم بتسجيل الدخول كالمعتاد.`,
            hi: `<span style="color: var(--nexus-green); font-family: var(--font-mono);">app.hyperliquid.xyz</span> पर नेविगेट करें और हमेशा की तरह साइन इन करें।`,
            pl: `Przejdź do <span style="color: var(--nexus-green); font-family: var(--font-mono);">app.hyperliquid.xyz</span> i zaloguj się jak zwykle.`,
            nl: `Navigeer naar <span style="color: var(--nexus-green); font-family: var(--font-mono);">app.hyperliquid.xyz</span> en log in zoals gewoonlijk.`
        },
        setup_card4_title: {
            en: `Click to activate`,
            zh: `点击即可激活`,
            fr: `Cliquez pour activer`,
            ko: `클릭하면 활성화`,
            es: `Haz clic para activar`,
            ja: `クリックして有効化`,
            tr: `Tıklayıp etkinleştirin`,
            vi: `Nhấn để kích hoạt`,
            ru: `Нажмите для активации`,
            de: `Zum Aktivieren klicken`,
            pt: `Clique para ativar`,
            it: `Clicca per attivare`,
            ar: `انقر للتفعيل`,
            hi: `सक्रिय करने के लिए क्लिक करें`,
            pl: `Kliknij, aby aktywować`,
            nl: `Klik om te activeren`
        },
        setup_card4_desc: {
            en: `Hit the bookmark you just saved. NexusTools injects instantly and the trading console comes online.`,
            zh: `点击刚保存的书签。NexusTools 会瞬间注入交易控制台随即上线。`,
            fr: `Cliquez sur le favori enregistré. NexusTools s’injecte instantanément et la console de trading s’ouvre.`,
            ko: `방금 저장한 북마크를 누르면 NexusTools 가 즉시 주입되어 트레이딩 콘솔이 열린다.`,
            es: `Pulsa el marcador que acabas de guardar. NexusTools se inyecta al instante y la consola cobra vida.`,
            ja: `保存したばかりのブックマークをクリックすると即座に NexusTools が注入されトレードコンソールが起動します。`,
            tr: `Az önce kaydettiğiniz yer imine tıklayın. NexusTools anında yüklenir ve işlem konsolu açılır.`,
            vi: `Nhấp bookmark vừa lưu. NexusTools được tải ngay và bảng điều khiển giao dịch khởi động.`,
            ru: `Нажмите на закладку, которую вы только что сохранили. NexusTools внедряется мгновенно, и торговая консоль выходит в онлайн.`,
            de: `Klicken Sie auf das Lesezeichen, das Sie gerade gespeichert haben. NexusTools injiziert sofort und die Trading-Konsole geht online.`,
            pt: `Clique no favorito que você acabou de salvar. NexusTools injeta instantaneamente e o console de trading fica online.`,
            it: `Clicca sul segnalibro che hai appena salvato. NexusTools si inietta istantaneamente e la console di trading diventa online.`,
            ar: `انقر على الإشارة المرجعية التي حفظتها للتو. يتم حقن NexusTools على الفور وتصبح وحدة التحكم في التداول متاحة عبر الإنترنت.`,
            hi: `आपने अभी जो बुकमार्क सहेजा है उस पर क्लिक करें। NexusTools तुरंत इंजेक्ट हो जाता है और ट्रेडिंग कंसोल ऑनलाइन आ जाता है।`,
            pl: `Kliknij zakładkę, którą właśnie zapisałeś. NexusTools wstrzykuje się natychmiast, a konsola tradingowa wchodzi online.`,
            nl: `Klik op het bladwijzer dat u zojuist hebt opgeslagen. NexusTools injecteert onmiddellijk en de tradingconsole komt online.`
        },
        method_tag: {
            en: `Autonomous Stack`,
            zh: `自治堆栈`,
            fr: `Pile autonome`,
            ko: `자율 스택`,
            es: `Pila autónoma`,
            ja: `オートノマススタック`,
            tr: `Otonom yığın`,
            vi: `Ngăn xếp tự chủ`,
            ru: `Автономный стек`,
            de: `Autonomer Stack`,
            pt: `Pilha autônoma`,
            it: `Stack autonomo`,
            ar: `مكدس مستقل`,
            hi: `स्वायत्त स्टैक`,
            pl: `Autonomiczny stos`,
            nl: `Autonome stack`
        },
        method_title: {
            en: `Cloud bots are liabilities`,
            zh: `云端机器人是风险`,
            fr: `Les bots cloud sont des passifs`,
            ko: `클라우드 봇은 리스크입니다`,
            es: `Los bots en la nube son pasivos`,
            ja: `クラウドボットはリスクです`,
            tr: `Bulut botları yükümlülüktür`,
            vi: `Bot đám mây là rủi ro`,
            ru: `Облачные боты - это обязательства`,
            de: `Cloud-Bots sind Verbindlichkeiten`,
            pt: `Bots em nuvem são passivos`,
            it: `I bot cloud sono passività`,
            ar: `البوتات السحابية هي التزامات`,
            hi: `क्लाउड बॉट्स देनदारियां हैं`,
            pl: `Boty w chmurze to zobowiązania`,
            nl: `Cloud-bots zijn verplichtingen`
        },
        method_desc: {
            en: `Everything runs locally inside the Hyperliquid tab you already trust. No API credentials, no remote latency, no unexplained withdrawals.`,
            zh: `所有逻辑都在你信任的 Hyperliquid 标签页中本地运行。无需 API 凭证没有远程延迟也不会出现莫名的提币。`,
            fr: `Tout s’exécute localement dans l’onglet Hyperliquid que vous utilisez déjà. Aucun identifiant API, aucune latence distante, aucun retrait inexpliqué.`,
            ko: `모든 것은 이미 신뢰하는 Hyperliquid 탭 안에서 로컬로 실행됩니다. API 자격 증명 없음, 원격 지연 없음, 설명되지 않는 출금 없음.`,
            es: `Todo se ejecuta localmente dentro de tu pestaña de Hyperliquid. Sin credenciales API, sin latencia remota, sin retiros inexplicables.`,
            ja: `信頼している Hyperliquid タブ内で全てがローカル動作します。API 資格情報も遠隔レイテンシも不明な出金もありません。`,
            tr: `Her şey zaten güvendiğiniz Hyperliquid sekmesinde yerel olarak çalışır. API kimliği yok, uzak gecikme yok, açıklanamayan çekim yok.`,
            vi: `Mọi thứ chạy cục bộ ngay trong tab Hyperliquid bạn đang tin dùng. Không cần API, không độ trễ từ xa, không có lệnh rút tiền khó hiểu.`,
            ru: `Все работает локально внутри вкладки Hyperliquid, которой вы уже доверяете. Без учетных данных API, без удаленной задержки, без необъяснимых выводов.`,
            de: `Alles läuft lokal innerhalb des Hyperliquid-Tabs, dem Sie bereits vertrauen. Keine API-Anmeldedaten, keine Remote-Latenz, keine unerklärlichen Abhebungen.`,
            pt: `Tudo funciona localmente dentro da aba Hyperliquid em que você já confia. Sem credenciais de API, sem latência remota, sem saques inexplicáveis.`,
            it: `Tutto funziona localmente all'interno della scheda Hyperliquid di cui ti fidi già. Nessuna credenziale API, nessuna latenza remota, nessun prelievo inspiegabile.`,
            ar: `كل شيء يعمل محليًا داخل علامة تبويب Hyperliquid التي تثق بها بالفعل. لا بيانات اعتماد API، ولا زمن انتقال بعيد، ولا عمليات سحب غير مبررة.`,
            hi: `सब कुछ स्थानीय रूप से Hyperliquid टैब के अंदर चलता है जिस पर आप पहले से भरोसा करते हैं। कोई API क्रेडेंशियल नहीं, कोई दूरस्थ विलंब नहीं, कोई अस्पष्ट निकासी नहीं।`,
            pl: `Wszystko działa lokalnie wewnątrz zakładki Hyperliquid, której już ufasz. Brak poświadczeń API, brak opóźnień zdalnych, brak niewyjaśnionych wypłat.`,
            nl: `Alles draait lokaal binnen het Hyperliquid-tabblad dat u al vertrouwt. Geen API-referenties, geen remote latentie, geen onverklaarbare opnames.`
        },
        terminal_line_1: {
            en: `&gt; Initializing NexusTools v1.4.2...`,
            zh: `&gt; 正在初始化 NexusTools v1.4.2...`,
            fr: `&gt; Initialisation de NexusTools v1.4.2...`,
            ko: `&gt; NexusTools v1.4.2 초기화...`,
            es: `&gt; Inicializando NexusTools v1.4.2...`,
            ja: `&gt; NexusTools v1.4.2 を初期化中...`,
            tr: `&gt; NexusTools v1.4.2 başlatılıyor...`,
            vi: `&gt; Đang khởi tạo NexusTools v1.4.2...`,
            ru: `&gt; Инициализация NexusTools v1.4.2...`,
            de: `&gt; Initialisiere NexusTools v1.4.2...`,
            pt: `&gt; Inicializando NexusTools v1.4.2...`,
            it: `&gt; Inizializzazione NexusTools v1.4.2...`,
            ar: `&gt; تهيئة NexusTools v1.4.2...`,
            hi: `&gt; NexusTools v1.4.2 आरंभ कर रहा है...`,
            pl: `&gt; Inicjalizacja NexusTools v1.4.2...`,
            nl: `&gt; Initialiseren van NexusTools v1.4.2...`
        },
        terminal_line_2: {
            en: `&gt; Scanning orderbook depth...`,
            zh: `&gt; 正在扫描订单簿深度...`,
            fr: `&gt; Analyse de la profondeur du carnet...`,
            ko: `&gt; 주문서 깊이 스캔 중...`,
            es: `&gt; Escaneando profundidad del libro...`,
            ja: `&gt; 板の深さをスキャン中...`,
            tr: `&gt; Emir defteri derinliği taranıyor...`,
            vi: `&gt; Quét độ sâu sổ lệnh...`,
            ru: `&gt; Сканирование глубины книги заказов...`,
            de: `&gt; Scanne Orderbuch-Tiefe...`,
            pt: `&gt; Escaneando profundidade do livro de ordens...`,
            it: `&gt; Scansione della profondità del libro ordini...`,
            ar: `&gt; فحص عمق دفتر الطلبات...`,
            hi: `&gt; ऑर्डरबुक गहराई स्कैन कर रहा है...`,
            pl: `&gt; Skanowanie głębokości książki zleceń...`,
            nl: `&gt; Scannen van orderboekdiepte...`
        },
        terminal_line_3: {
            en: `&gt; Spread analysis: <span class="success">0.02%</span>`,
            zh: `&gt; 价差分析：<span class="success">0.02%</span>`,
            fr: `&gt; Analyse du spread : <span class="success">0,02%</span>`,
            ko: `&gt; 스프레드 분석: <span class="success">0.02%</span>`,
            es: `&gt; Análisis del spread: <span class="success">0.02%</span>`,
            ja: `&gt; スプレッド分析：<span class="success">0.02%</span>`,
            tr: `&gt; Spread analizi: <span class="success">0.02%</span>`,
            vi: `&gt; Phân tích spread: <span class="success">0,02%</span>`,
            ru: `&gt; Анализ спреда: <span class="success">0.02%</span>`,
            de: `&gt; Spread-Analyse: <span class="success">0.02%</span>`,
            pt: `&gt; Análise de spread: <span class="success">0.02%</span>`,
            it: `&gt; Analisi spread: <span class="success">0.02%</span>`,
            ar: `&gt; تحليل الفارق: <span class="success">0.02%</span>`,
            hi: `&gt; स्प्रेड विश्लेषण: <span class="success">0.02%</span>`,
            pl: `&gt; Analiza spreadu: <span class="success">0.02%</span>`,
            nl: `&gt; Spread-analyse: <span class="success">0.02%</span>`
        },
        terminal_line_4: {
            en: `&gt; OPPORTUNITY DETECTED [HLP-USD]`,
            zh: `&gt; 发现机会 [HLP-USD]`,
            fr: `&gt; OPPORTUNITÉ DÉTECTÉE [HLP-USD]`,
            ko: `&gt; 기회 감지 [HLP-USD]`,
            es: `&gt; OPORTUNIDAD DETECTADA [HLP-USD]`,
            ja: `&gt; チャンス検出 [HLP-USD]`,
            tr: `&gt; FIRSAT ALGILANDI [HLP-USD]`,
            vi: `&gt; PHÁT HIỆN CƠ HỘI [HLP-USD]`,
            ru: `&gt; ОБНАРУЖЕНА ВОЗМОЖНОСТЬ [HLP-USD]`,
            de: `&gt; GELEGENHEIT ERKANNT [HLP-USD]`,
            pt: `&gt; OPORTUNIDADE DETECTADA [HLP-USD]`,
            it: `&gt; OPPORTUNITÀ RILEVATA [HLP-USD]`,
            ar: `&gt; تم اكتشاف الفرصة [HLP-USD]`,
            hi: `&gt; अवसर का पता चला [HLP-USD]`,
            pl: `&gt; WYKRYTA OKAZJA [HLP-USD]`,
            nl: `&gt; KANS GEDETECTEERD [HLP-USD]`
        },
        terminal_line_5: {
            en: `&gt; Executing localized limit order...`,
            zh: `&gt; 执行本地限价单...`,
            fr: `&gt; Exécution d’un ordre limite local...`,
            ko: `&gt; 로컬 지정가 주문 실행 중...`,
            es: `&gt; Ejecutando orden limitada local...`,
            ja: `&gt; ローカル指値注文を実行中...`,
            tr: `&gt; Yerel limit emri yürütülüyor...`,
            vi: `&gt; Đang khớp lệnh giới hạn cục bộ...`,
            ru: `&gt; Выполнение локального лимитного ордера...`,
            de: `&gt; Führe lokalen Limit-Order aus...`,
            pt: `&gt; Executando ordem limitada localizada...`,
            it: `&gt; Esecuzione ordine limite localizzato...`,
            ar: `&gt; تنفيذ أمر حد محلي...`,
            hi: `&gt; स्थानीय सीमा आदेश निष्पादित कर रहा है...`,
            pl: `&gt; Wykonywanie zlokalizowanego zlecenia z limitem...`,
            nl: `&gt; Uitvoeren van gelokaliseerde limietorder...`
        },
        terminal_line_6: {
            en: `&gt; Latency: <span class="success">3ms</span>`,
            zh: `&gt; 延迟：<span class="success">3ms</span>`,
            fr: `&gt; Latence : <span class="success">3 ms</span>`,
            ko: `&gt; 지연: <span class="success">3ms</span>`,
            es: `&gt; Latencia: <span class="success">3 ms</span>`,
            ja: `&gt; レイテンシ：<span class="success">3ms</span>`,
            tr: `&gt; Gecikme: <span class="success">3ms</span>`,
            vi: `&gt; Độ trễ: <span class="success">3ms</span>`,
            ru: `&gt; Задержка: <span class="success">3ms</span>`,
            de: `&gt; Latenz: <span class="success">3ms</span>`,
            pt: `&gt; Latência: <span class="success">3ms</span>`,
            it: `&gt; Latenza: <span class="success">3ms</span>`,
            ar: `&gt; زمن الانتقال: <span class="success">3ms</span>`,
            hi: `&gt; विलंब: <span class="success">3ms</span>`,
            pl: `&gt; Opóźnienie: <span class="success">3ms</span>`,
            nl: `&gt; Latentie: <span class="success">3ms</span>`
        },
        terminal_line_7: {
            en: `&gt; Fill confirmed.`,
            zh: `&gt; 成交确认。`,
            fr: `&gt; Exécution confirmée.`,
            ko: `&gt; 체결 완료.`,
            es: `&gt; Ejecución confirmada.`,
            ja: `&gt; 約定を確認。`,
            tr: `&gt; Emir gerçekleşti.`,
            vi: `&gt; Lệnh đã khớp.`,
            ru: `&gt; Заполнение подтверждено.`,
            de: `&gt; Ausführung bestätigt.`,
            pt: `&gt; Preenchimento confirmado.`,
            it: `&gt; Riempimento confermato.`,
            ar: `&gt; تم تأكيد التعبئة.`,
            hi: `&gt; भरण पुष्टि की गई।`,
            pl: `&gt; Wypełnienie potwierdzone.`,
            nl: `&gt; Uitvoering bevestigd.`
        },
        terminal_line_8: {
            en: `&gt; PnL Tracking: <span id="terminal-pnl">+5.8%</span> (<span id="terminal-usd">$1,742.63</span>)`,
            zh: `&gt; 收益跟踪：<span id="terminal-pnl">+5.8%</span> (<span id="terminal-usd">$1,742.63</span>)`,
            fr: `&gt; Suivi PnL : <span id="terminal-pnl">+5,8%</span> (<span id="terminal-usd">$1 742,63</span>)`,
            ko: `&gt; 손익 추적: <span id="terminal-pnl">+5.8%</span> (<span id="terminal-usd">$1,742.63</span>)`,
            es: `&gt; Seguimiento PnL: <span id="terminal-pnl">+5.8%</span> (<span id="terminal-usd">$1,742.63</span>)`,
            ja: `&gt; 損益トラッキング：<span id="terminal-pnl">+5.8%</span> (<span id="terminal-usd">$1,742.63</span>)`,
            tr: `&gt; Kar zarar takibi: <span id="terminal-pnl">+%5,8</span> (<span id="terminal-usd">$1.742,63</span>)`,
            vi: `&gt; Theo dõi PnL: <span id="terminal-pnl">+5,8%</span> (<span id="terminal-usd">$1.742,63</span>)`,
            ru: `&gt; Отслеживание PnL: <span id="terminal-pnl">+5.8%</span> (<span id="terminal-usd">$1,742.63</span>)`,
            de: `&gt; PnL-Verfolgung: <span id="terminal-pnl">+5.8%</span> (<span id="terminal-usd">$1.742,63</span>)`,
            pt: `&gt; Rastreamento PnL: <span id="terminal-pnl">+5.8%</span> (<span id="terminal-usd">$1.742,63</span>)`,
            it: `&gt; Tracciamento PnL: <span id="terminal-pnl">+5.8%</span> (<span id="terminal-usd">$1.742,63</span>)`,
            ar: `&gt; تتبع الربح والخسارة: <span id="terminal-pnl">+5.8%</span> (<span id="terminal-usd">$1,742.63</span>)`,
            hi: `&gt; PnL ट्रैकिंग: <span id="terminal-pnl">+5.8%</span> (<span id="terminal-usd">$1,742.63</span>)`,
            pl: `&gt; Śledzenie PnL: <span id="terminal-pnl">+5.8%</span> (<span id="terminal-usd">$1.742,63</span>)`,
            nl: `&gt; PnL-tracking: <span id="terminal-pnl">+5.8%</span> (<span id="terminal-usd">$1.742,63</span>)`
        },
        method_item1_title: {
            en: `The API Trap`,
            zh: `API 陷阱`,
            fr: `Le piège des API`,
            ko: `API 함정`,
            es: `La trampa del API`,
            ja: `API の罠`,
            tr: `API tuzağı`,
            vi: `Cái bẫy API`,
            ru: `Ловушка API`,
            de: `Die API-Falle`,
            pt: `A armadilha da API`,
            it: `La trappola dell'API`,
            ar: `فخ API`,
            hi: `API जाल`,
            pl: `Pułapka API`,
            nl: `De API-val`
        },
        method_item1_desc: {
            en: `Normal bots demand your API Secret Key which means they can drain you. NexusTools operates via bookmarklet injection. It clicks buttons for you locally and literally cannot withdraw funds.`,
            zh: `传统机器人必须索要 API 密钥等于把账户交出去。NexusTools 通过书签注入只在本地点击按钮完全无法发起提现。`,
            fr: `Les bots classiques exigent votre clé API secrète et peuvent vider votre compte. NexusTools s’exécute via un bookmarklet local qui ne fait que cliquer sur vos boutons et ne peut pas retirer de fonds.`,
            ko: `일반 봇은 API 시크릿 키를 요구해 계좌를 비울 수 있습니다. NexusTools 는 북마클릿 주입으로 동작하며 로컬에서 버튼만 클릭하므로 출금을 실행할 수 없습니다.`,
            es: `Los bots normales exigen tu clave secreta de API y podrían vaciarte. NexusTools funciona como bookmarklet, solo hace clics locales y literalmente no puede retirar fondos.`,
            ja: `一般的なボットは API シークレットキーを求め資金を吸い上げます。NexusTools はブックマークレットとして動作しローカルでボタンを押すだけなので出金は不可能です。`,
            tr: `Klasik botlar API gizli anahtarınızı ister ve hesabınızı boşaltabilir. NexusTools ise bookmarklet enjeksiyonu ile çalışır; sadece yerel butonlara basar ve para çekemez.`,
            vi: `Bot thông thường đòi API Secret Key tức là có thể rút sạch tiền. NexusTools chạy bằng bookmarklet, chỉ bấm các nút ngay tại máy bạn và không thể rút tiền.`,
            ru: `Обычные боты требуют ваш секретный ключ API, что означает, что они могут вас обокрасть. NexusTools работает через внедрение букмарклета. Он нажимает кнопки за вас локально и буквально не может вывести средства.`,
            de: `Normale Bots verlangen Ihren API-Geheimschlüssel, was bedeutet, dass sie Sie ausnehmen können. NexusTools arbeitet über Bookmarklet-Injektion. Es klickt lokal für Sie auf Schaltflächen und kann buchstäblich keine Gelder abheben.`,
            pt: `Bots normais exigem sua chave secreta de API, o que significa que podem drenar você. NexusTools opera via injeção de bookmarklet. Ele clica em botões para você localmente e literalmente não pode sacar fundos.`,
            it: `I bot normali richiedono la tua chiave segreta API, il che significa che possono prosciugarti. NexusTools opera tramite iniezione di bookmarklet. Clicca sui pulsanti per te localmente e letteralmente non può prelevare fondi.`,
            ar: `تطلب البوتات العادية مفتاح API السري الخاص بك مما يعني أنها يمكن أن تستنزفك. يعمل NexusTools عبر حقن الإشارة المرجعية. ينقر على الأزرار لك محليًا ولا يمكنه حرفيًا سحب الأموال.`,
            hi: `सामान्य बॉट आपकी API सीक्रेट कुंजी मांगते हैं जिसका मतलब है कि वे आपको खाली कर सकते हैं। NexusTools बुकमार्कलेट इंजेक्शन के माध्यम से काम करता है। यह आपके लिए स्थानीय रूप से बटन पर क्लिक करता है और शाब्दिक रूप से धन निकाल नहीं सकता।`,
            pl: `Normalne boty wymagają Twojego tajnego klucza API, co oznacza, że mogą Cię opróżnić. NexusTools działa poprzez wstrzyknięcie bookmarkletu. Klika przyciski za Ciebie lokalnie i dosłownie nie może wypłacać środków.`,
            nl: `Normale bots eisen uw API-geheime sleutel, wat betekent dat ze u kunnen leegtrekken. NexusTools werkt via bookmarklet-injectie. Het klikt op knoppen voor u lokaal en kan letterlijk geen fondsen opnemen.`
        },
        method_item2_title: {
            en: `Micro-Latency Execution`,
            zh: `微延迟执行`,
            fr: `Exécution micro-latence`,
            ko: `초저지연 실행`,
            es: `Ejecución de micro latencia`,
            ja: `マイクロレイテンシ実行`,
            tr: `Mikro gecikmeli yürütme`,
            vi: `Thực thi độ trễ siêu thấp`,
            ru: `Выполнение с микро-задержкой`,
            de: `Mikro-Latenz-Ausführung`,
            pt: `Execução de micro latência`,
            it: `Esecuzione micro-latenza`,
            ar: `تنفيذ زمن انتقال دقيق`,
            hi: `माइक्रो-विलंब निष्पादन`,
            pl: `Wykonanie mikro-opóźnienia`,
            nl: `Micro-latentie-uitvoering`
        },
        method_item2_desc: {
            en: `Cloud bots add server hop latency. NexusTools lives inside the Hyperliquid tab and reacts to DOM updates faster than the human eye.`,
            zh: `云端机器人增加服务器跳数导致延迟。NexusTools 常驻 Hyperliquid 标签响应 DOM 更新比肉眼更快。`,
            fr: `Les bots cloud ajoutent des sauts serveur. NexusTools vit dans l’onglet Hyperliquid et réagit aux mises à jour du DOM plus vite que l’œil humain.`,
            ko: `클라우드 봇은 서버 홉으로 지연을 키웁니다. NexusTools 는 Hyperliquid 탭 안에 상주하며 DOM 변화를 인간보다 빠르게 감지합니다.`,
            es: `Los bots en la nube suman saltos de servidor. NexusTools vive en la pestaña de Hyperliquid y responde a los cambios del DOM más rápido que el ojo humano.`,
            ja: `クラウドボットはサーバーホップで遅延を増やします。NexusTools は Hyperliquid タブ内で動作し DOM 更新に人間より速く反応します。`,
            tr: `Bulut botları sunucu atlamalarıyla gecikme ekler. NexusTools Hyperliquid sekmesinde yaşar ve DOM güncellemelerine gözden hızlı tepki verir.`,
            vi: `Bot đám mây thêm độ trễ qua nhiều máy chủ. NexusTools chạy ngay trong tab Hyperliquid và phản hồi DOM nhanh hơn cả mắt người.`,
            ru: `Облачные боты добавляют задержку серверного прыжка. NexusTools живет внутри вкладки Hyperliquid и реагирует на обновления DOM быстрее, чем человеческий глаз.`,
            de: `Cloud-Bots fügen Server-Hop-Latenz hinzu. NexusTools lebt innerhalb des Hyperliquid-Tabs und reagiert auf DOM-Updates schneller als das menschliche Auge.`,
            pt: `Bots em nuvem adicionam latência de salto de servidor. NexusTools vive dentro da aba Hyperliquid e reage a atualizações DOM mais rápido que o olho humano.`,
            it: `I bot cloud aggiungono latenza di hop del server. NexusTools vive all'interno della scheda Hyperliquid e reagisce agli aggiornamenti DOM più velocemente dell'occhio umano.`,
            ar: `تضيف البوتات السحابية زمن انتقال قفزة الخادم. يعيش NexusTools داخل علامة تبويب Hyperliquid ويتفاعل مع تحديثات DOM أسرع من العين البشرية.`,
            hi: `क्लाउड बॉट सर्वर हॉप विलंब जोड़ते हैं। NexusTools Hyperliquid टैब के अंदर रहता है और मानव आंख से तेज DOM अपडेट पर प्रतिक्रिया करता है।`,
            pl: `Boty w chmurze dodają opóźnienie przeskoku serwera. NexusTools żyje wewnątrz zakładki Hyperliquid i reaguje na aktualizacje DOM szybciej niż ludzkie oko.`,
            nl: `Cloud-bots voegen server-hop-latentie toe. NexusTools leeft binnen het Hyperliquid-tabblad en reageert op DOM-updates sneller dan het menselijk oog.`
        },
        method_item3_title: {
            en: `Phantom Mode`,
            zh: `幻影模式`,
            fr: `Mode fantôme`,
            ko: `팬텀 모드`,
            es: `Modo fantasma`,
            ja: `ファントムモード`,
            tr: `Fantom modu`,
            vi: `Chế độ Phantom`,
            ru: `Режим призрака`,
            de: `Phantom-Modus`,
            pt: `Modo fantasma`,
            it: `Modalità fantasma`,
            ar: `وضع الشبح`,
            hi: `फैंटम मोड`,
            pl: `Tryb fantomowy`,
            nl: `Fantoommodus`
        },
        method_item3_desc: {
            en: `Because it mimics user clicks, NexusTools is indistinguishable from a highly skilled manual trader. No API rate limits. No bans. Complete stealth operation.`,
            zh: `它模拟人工点击因此看起来像经验丰富的手动交易者。没有 API 速率限制没有封禁完全隐身。`,
            fr: `Comme il imite vos clics, NexusTools est indiscernable d’un trader manuel expert. Pas de limite API. Aucun bannissement. Opération totalement furtive.`,
            ko: `사용자 클릭을 모방하므로 NexusTools 는 숙련된 수동 트레이더와 구분되지 않습니다. API 속도 제한 없음. 차단 없음. 완전한 스텔스입니다.`,
            es: `Al imitar tus clics, NexusTools es indistinguible de un trader manual experto. Sin límites de API. Sin baneos. Operación totalmente sigilosa.`,
            ja: `ユーザーのクリックを再現するため熟練トレーダーと区別がつきません。API レート制限なし。BAN なし。完全なステルス運用です。`,
            tr: `Kullanıcı tıklamalarını taklit ettiği için NexusTools usta bir manuel traderdan ayırt edilemez. API hız limiti yok. Yasak yok. Tam gizlilik.`,
            vi: `Vì mô phỏng thao tác của bạn nên NexusTools không khác gì một trader thủ công lão luyện. Không giới hạn API, không bị khóa, vận hành hoàn toàn ẩn danh.`,
            ru: `Поскольку он имитирует клики пользователя, NexusTools неотличим от высококвалифицированного ручного трейдера. Без ограничений скорости API. Без банов. Полная скрытая работа.`,
            de: `Da es Benutzerklicks nachahmt, ist NexusTools nicht von einem hochqualifizierten manuellen Trader zu unterscheiden. Keine API-Ratenlimits. Keine Bans. Vollständiger Stealth-Betrieb.`,
            pt: `Porque imita cliques do usuário, NexusTools é indistinguível de um trader manual altamente qualificado. Sem limites de taxa de API. Sem bans. Operação stealth completa.`,
            it: `Poiché imita i clic dell'utente, NexusTools è indistinguibile da un trader manuale altamente qualificato. Nessun limite di velocità API. Nessun ban. Funzionamento stealth completo.`,
            ar: `لأنه يحاكي نقرات المستخدم، لا يمكن تمييز NexusTools عن متداول يدوي ماهر للغاية. لا حدود لمعدل API. لا حظر. عملية خفية كاملة.`,
            hi: `क्योंकि यह उपयोगकर्ता क्लिक की नकल करता है, NexusTools एक अत्यधिक कुशल मैनुअल ट्रेडर से अविभेद्य है। कोई API दर सीमा नहीं। कोई प्रतिबंध नहीं। पूर्ण स्टील्थ संचालन।`,
            pl: `Ponieważ naśladuje kliknięcia użytkownika, NexusTools jest nie do odróżnienia od wysoce wykwalifikowanego handlowca ręcznego. Brak limitów szybkości API. Brak banów. Pełna operacja stealth.`,
            nl: `Omdat het gebruikersklikken nabootst, is NexusTools niet te onderscheiden van een zeer bekwame handmatige handelaar. Geen API-snelheidslimieten. Geen bans. Volledige stealth-operatie.`
        },
        features_tag: {
            en: `Execution Modes`,
            zh: `执行模式`,
            fr: `Modes d’exécution`,
            ko: `실행 모드`,
            es: `Modos de ejecución`,
            ja: `実行モード`,
            tr: `Yürütme modları`,
            vi: `Chế độ thực thi`,
            ru: `Режимы выполнения`,
            de: `Ausführungsmodi`,
            pt: `Modos de execução`,
            it: `Modalità di esecuzione`,
            ar: `أوضاع التنفيذ`,
            hi: `निष्पादन मोड`,
            pl: `Tryby wykonania`,
            nl: `Uitvoeringsmodi`
        },
        features_title: {
            en: `Built for aggressive scalpers and silent whales`,
            zh: `为激进剥头皮者与静默巨鲸而建`,
            fr: `Conçu pour les scalpers agressifs et les baleines discrètes`,
            ko: `공격적인 스캘퍼와 조용한 고래를 위해 설계됨`,
            es: `Diseñado para scalpers agresivos y ballenas silenciosas`,
            ja: `攻撃的なスキャルパーと静かなクジラのために構築`,
            tr: `Agresif scalperlar ve sessiz balinalar için inşa edildi`,
            vi: `Xây cho scalper táo bạo và cá voi thầm lặng`,
            ru: `Создано для агрессивных скальперов и тихих китов`,
            de: `Gebaut für aggressive Scalper und stille Wale`,
            pt: `Construído para scalpers agressivos e baleias silenciosas`,
            it: `Costruito per scalper aggressivi e balene silenziose`,
            ar: `مبني للمتداولين النشطين والحيتان الصامتة`,
            hi: `आक्रामक स्केलपर और चुपचाप व्हेल के लिए बनाया गया`,
            pl: `Zbudowane dla agresywnych skalperów i cichych wielorybów`,
            nl: `Gebouwd voor agressieve scalpers en stille walvissen`
        },
        features_desc: {
            en: `Every module is tuned for Hyperliquid's matching engine, from latency-optimized entries to stealth exit automation.`,
            zh: `每个模块都针对 Hyperliquid 撮合引擎调校从低延迟入场到隐身离场自动化。`,
            fr: `Chaque module est ajusté pour le moteur Hyperliquid, des entrées optimisées en latence aux sorties furtives automatisées.`,
            ko: `모든 모듈이 Hyperliquid 매칭 엔진에 맞춰져 낮은 지연의 진입부터 스텔스 출구 자동화까지 제공합니다.`,
            es: `Cada módulo está afinado para el motor de Hyperliquid, desde entradas optimizadas hasta salidas sigilosas.`,
            ja: `すべてのモジュールを Hyperliquid のマッチングエンジン向けに調整し低遅延エントリーからステルスな出口自動化まで実装しています。`,
            tr: `Her modül Hyperliquid eşleştirme motoru için ayarlandı; düşük gecikmeli girişten gizli çıkış otomasyonuna kadar.`,
            vi: `Mọi mô đun được tinh chỉnh cho động cơ Hyperliquid từ vào lệnh tối ưu độ trễ đến thoát lệnh ẩn.`,
            ru: `Каждый модуль настроен для движка сопоставления Hyperliquid, от оптимизированных по задержке входов до автоматизации скрытого выхода.`,
            de: `Jedes Modul ist auf die Hyperliquid-Matching-Engine abgestimmt, von latenzoptimierten Einstiegen bis zur Stealth-Ausstiegsautomatisierung.`,
            pt: `Cada módulo é ajustado para o motor de correspondência do Hyperliquid, desde entradas otimizadas para latência até automação de saída furtiva.`,
            it: `Ogni modulo è ottimizzato per il motore di matching di Hyperliquid, dagli ingressi ottimizzati per la latenza all'automazione dell'uscita stealth.`,
            ar: `كل وحدة مضبوطة لمحرك المطابقة في Hyperliquid، من الإدخالات المحسّنة للزمن الانتقال إلى أتمتة الخروج الخفي.`,
            hi: `प्रत्येक मॉड्यूल Hyperliquid के मिलान इंजन के लिए ट्यून किया गया है, विलंब-अनुकूलित प्रविष्टियों से लेकर स्टील्थ निकास स्वचालन तक।`,
            pl: `Każdy moduł jest dostosowany do silnika dopasowywania Hyperliquid, od wejść zoptymalizowanych pod kątem opóźnień po automatyzację ukrytego wyjścia.`,
            nl: `Elke module is afgestemd op de Hyperliquid-matching engine, van latentie-geoptimaliseerde ingangen tot stealth-uitgangsautomatisering.`
        },
        feature1_title: {
            en: `Momentum Scalping`,
            zh: `动量剥头皮`,
            fr: `Scalping momentum`,
            ko: `모멘텀 스캘핑`,
            es: `Scalping de momentum`,
            ja: `モメンタムスキャルピング`,
            tr: `Momentum scalping`,
            vi: `Scalping động lượng`,
            ru: `Скальпинг на импульсе`,
            de: `Momentum-Scalping`,
            pt: `Scalping de momentum`,
            it: `Scalping momentum`,
            ar: `تداول زخم`,
            hi: `मोमेंटम स्केलपिंग`,
            pl: `Skalpowanie momentum`,
            nl: `Momentum scalping`
        },
        feature1_desc: {
            en: `Identifies micro-breakouts in the HLP orderbook before the UI even updates. Get in, grab 0.5%, get out. Fully automated profit extraction.`,
            zh: `在界面更新前识别 HLP 订单簿中的微型突破。进场拿下 0.5% 后退出，全程自动提取利润。`,
            fr: `Détecte les micro-breakouts sur le carnet HLP avant que l’interface ne se mette à jour. Entrée, +0,5 %, sortie. Extraction de profit entièrement automatique.`,
            ko: `UI 가 업데이트되기 전에 HLP 주문서의 마이크로 브레이크아웃을 포착합니다. 진입해 0.5% 를 챙기고 바로 나옵니다. 전자동 수익화.`,
            es: `Detecta micro rupturas en el libro HLP antes de que la UI cambie. Entra, toma 0.5 %, sal. Extracción de beneficio automatizada.`,
            ja: `UI が更新される前に HLP 注文板の微小ブレイクアウトを検知。入って 0.5% を確保して即退出。完全自動の利益確保です。`,
            tr: `Arayüz güncellenmeden önce HLP emir defterindeki mikro kırılmaları yakalar. Gir, %0,5 al, çık. Tam otomatik kâr çıkarma.`,
            vi: `Phát hiện breakout siêu nhỏ trên sổ lệnh HLP trước khi UI kịp cập nhật. Vào lệnh, lấy 0,5%, thoát. Tự động hóa toàn bộ việc chốt lời.`,
            ru: `Определяет микро-пробои в книге заказов HLP до обновления интерфейса. Вход, захват 0.5%, выход. Полностью автоматизированное извлечение прибыли.`,
            de: `Erkennt Mikro-Ausbrüche im HLP-Orderbuch, bevor die Benutzeroberfläche aktualisiert wird. Einsteigen, 0,5% mitnehmen, aussteigen. Vollautomatische Gewinnentnahme.`,
            pt: `Identifica micro-rupturas no livro de ordens HLP antes mesmo que a interface seja atualizada. Entre, pegue 0,5%, saia. Extração de lucro totalmente automatizada.`,
            it: `Identifica micro-sfondamenti nel libro ordini HLP prima che l'interfaccia utente si aggiorni. Entra, prendi 0,5%, esci. Estrazione del profitto completamente automatizzata.`,
            ar: `يتعرف على الاختراقات الدقيقة في دفتر طلبات HLP قبل تحديث واجهة المستخدم. ادخل، احصل على 0.5%، اخرج. استخراج الربح آلي بالكامل.`,
            hi: `UI अपडेट होने से पहले HLP ऑर्डरबुक में माइक्रो-ब्रेकआउट की पहचान करता है। अंदर जाएं, 0.5% लें, बाहर निकलें। पूरी तरह से स्वचालित लाभ निष्कर्षण।`,
            pl: `Identyfikuje mikro-wyłomienia w książce zleceń HLP przed aktualizacją interfejsu. Wejdź, złap 0,5%, wyjdź. W pełni zautomatyzowana ekstrakcja zysków.`,
            nl: `Identificeert micro-uitbraken in het HLP-orderboek voordat de gebruikersinterface wordt bijgewerkt. Stap in, pak 0,5%, stap uit. Volledig geautomatiseerde winstextractie.`
        },
        feature2_title: {
            en: `Stop-Loss Trailing`,
            zh: `跟踪止损`,
            fr: `Stop suiveur`,
            ko: `트레일링 스톱`,
            es: `Stop loss dinámico`,
            ja: `トレーリングストップ`,
            tr: `Takip eden stop`,
            vi: `Trailing stop`,
            ru: `Трейлинг стоп-лосс`,
            de: `Trailing Stop-Loss`,
            pt: `Stop-loss dinâmico`,
            it: `Stop-loss trailing`,
            ar: `وقف الخسارة المتتبع`,
            hi: `स्टॉप-लॉस ट्रेलिंग`,
            pl: `Trailing stop-loss`,
            nl: `Trailing stop-loss`
        },
        feature2_desc: {
            en: `Dynamic trailing stops that adjust based on volatility, not fixed percentages. Protects profits automatically while maximizing upside potential.`,
            zh: `根据波动而非固定比例的动态跟踪止损。自动保护利润同时保留上行空间。`,
            fr: `Stops suiveurs dynamiques basés sur la volatilité. Ils protègent le gain tout en laissant l’upside.`,
            ko: `고정 퍼센트가 아닌 변동성에 따라 조정되는 동적 추적 스톱. 이익을 지키면서 상승 여력을 유지합니다.`,
            es: `Stops dinámicos que dependen de la volatilidad, no de porcentajes fijos. Protegen la ganancia y dejan correr la tendencia.`,
            ja: `固定率ではなくボラティリティに応じて調整する動的トレーリング。利益を自動で守りつつ上昇余地を最大化します。`,
            tr: `Sabit oran yerine volatiliteye göre ayarlanan dinamik trailing stop. Kârı korurken yukarı yönü açık bırakır.`,
            vi: `Trailing stop động dựa vào biến động chứ không cố định phần trăm. Tự động bảo vệ lợi nhuận nhưng vẫn giữ dư địa tăng.`,
            ru: `Динамические трейлинг-стопы, которые корректируются на основе волатильности, а не фиксированных процентов. Автоматически защищает прибыль, максимизируя потенциал роста.`,
            de: `Dynamische Trailing-Stops, die sich basierend auf der Volatilität anpassen, nicht auf festen Prozentsätzen. Schützt Gewinne automatisch und maximiert gleichzeitig das Aufwärtspotenzial.`,
            pt: `Stops dinâmicos que se ajustam com base na volatilidade, não em percentuais fixos. Protege lucros automaticamente enquanto maximiza o potencial de alta.`,
            it: `Stop dinamici che si adattano in base alla volatilità, non a percentuali fisse. Protegge automaticamente i profitti massimizzando il potenziale rialzista.`,
            ar: `توقفات ديناميكية تتكيف بناءً على التقلبات، وليس النسب المئوية الثابتة. تحمي الأرباح تلقائيًا مع تعظيم إمكانات الصعود.`,
            hi: `गतिशील ट्रेलिंग स्टॉप जो अस्थिरता के आधार पर समायोजित होते हैं, न कि निश्चित प्रतिशत। स्वचालित रूप से लाभ की रक्षा करते हुए ऊपर की क्षमता को अधिकतम करता है।`,
            pl: `Dynamiczne trailing stopy, które dostosowują się na podstawie zmienności, a nie stałych procentów. Automatycznie chroni zyski, maksymalizując potencjał wzrostu.`,
            nl: `Dynamische trailing stops die zich aanpassen op basis van volatiliteit, niet op vaste percentages. Beschermt winsten automatisch terwijl het opwaartse potentieel wordt gemaximaliseerd.`
        },
        feature3_title: {
            en: `Headless Mode`,
            zh: `无头模式`,
            fr: `Mode sans interface`,
            ko: `헤드리스 모드`,
            es: `Modo sin interfaz`,
            ja: `ヘッドレスモード`,
            tr: `Headless mod`,
            vi: `Chế độ headless`,
            ru: `Режим без интерфейса`,
            de: `Headless-Modus`,
            pt: `Modo headless`,
            it: `Modalità headless`,
            ar: `وضع بدون واجهة`,
            hi: `हेडलेस मोड`,
            pl: `Tryb headless`,
            nl: `Headless-modus`
        },
        feature3_desc: {
            en: `Run NexusTools in a background tab. It will sound an audible alert when a setup is found or a trade is executed. Trade while you work.`,
            zh: `在后台标签运行 NexusTools。发现机会或执行交易时会提示。边工作边交易。`,
            fr: `Exécutez NexusTools dans un onglet en arrière-plan. Une alerte sonore vous prévient dès qu’un setup apparaît ou qu’un trade part. Tradez en travaillant.`,
            ko: `NexusTools 를 백그라운드 탭에서 실행합니다. 셋업이 잡히거나 체결되면 알림을 울립니다. 일하면서 거래하세요.`,
            es: `Ejecuta NexusTools en una pestaña en segundo plano. Emitirá una alerta sonora al detectar setups o completar una operación. Opera mientras trabajas.`,
            ja: `NexusTools をバックグラウンドタブで動かします。セットアップ発見や約定時に通知しながら仕事と両立できます。`,
            tr: `NexusTools'u arka plandaki sekmede çalıştırın. Kurulum çıktığında veya emir yürütüldüğünde uyarır. Çalışırken trade edin.`,
            vi: `Chạy NexusTools ở tab nền. Có tín hiệu khi phát hiện setup hoặc hoàn tất giao dịch. Vừa làm vừa trade.`,
            ru: `Запустите NexusTools во вкладке фона. Он подаст звуковой сигнал, когда будет найден setup или выполнен трейд. Торгуйте во время работы.`,
            de: `Führen Sie NexusTools in einem Hintergrund-Tab aus. Es gibt einen hörbaren Alarm aus, wenn ein Setup gefunden wird oder ein Trade ausgeführt wird. Handeln Sie während der Arbeit.`,
            pt: `Execute NexusTools em uma aba em segundo plano. Ele emitirá um alerta sonoro quando uma configuração for encontrada ou uma negociação for executada. Negocie enquanto trabalha.`,
            it: `Esegui NexusTools in una scheda in background. Emetterà un allarme sonoro quando viene trovata una configurazione o viene eseguito uno scambio. Scambia mentre lavori.`,
            ar: `قم بتشغيل NexusTools في علامة تبويب خلفية. ستصدر تنبيهًا مسموعًا عند العثور على إعداد أو تنفيذ صفقة. تداول أثناء العمل.`,
            hi: `NexusTools को बैकग्राउंड टैब में चलाएं। जब कोई सेटअप मिलेगा या ट्रेड निष्पादित होगा तो यह एक श्रव्य अलर्ट देगा। काम करते समय ट्रेड करें।`,
            pl: `Uruchom NexusTools w zakładce w tle. Wyda dźwiękowy alert, gdy zostanie znaleziona konfiguracja lub wykonana transakcja. Handluj podczas pracy.`,
            nl: `Voer NexusTools uit in een achtergrondtabblad. Het geeft een hoorbaar alarm wanneer een setup wordt gevonden of een trade wordt uitgevoerd. Handel terwijl u werkt.`
        },
        pricing_tag: {
            en: `The Gatekeeper`,
            zh: `守门人`,
            fr: `Le gardien`,
            ko: `문지기`,
            es: `El guardián`,
            ja: `ゲートキーパー`,
            tr: `Kapı bekçisi`,
            vi: `Người gác cổng`,
            ru: `Привратник`,
            de: `Der Torwächter`,
            pt: `O guardião`,
            it: `Il guardiano`,
            ar: `حارس البوابة`,
            hi: `गेटकीपर`,
            pl: `Strażnik`,
            nl: `De poortwachter`
        },
        pricing_title: {
            en: `Earn first. Upgrade later`,
            zh: `先盈利再升级`,
            fr: `Gagnez d’abord. Améliorez ensuite`,
            ko: `먼저 수익 내고 나중에 업그레이드`,
            es: `Gana primero. Mejora después`,
            ja: `利益を得てからアップグレード`,
            tr: `Önce kazanın sonra yükseltin`,
            vi: `Kiếm tiền trước rồi mới nâng cấp`,
            ru: `Заработай сначала. Обнови позже`,
            de: `Zuerst verdienen. Später upgraden`,
            pt: `Ganhe primeiro. Atualize depois`,
            it: `Guadagna prima. Aggiorna dopo`,
            ar: `اكسب أولاً. قم بالترقية لاحقًا`,
            hi: `पहले कमाएं। बाद में अपग्रेड करें`,
            pl: `Najpierw zarabiaj. Potem ulepszaj`,
            nl: `Verdien eerst. Upgrade later`
        },
        pricing_subtitle: {
            en: `We don't want your money until you have taken theirs.`,
            zh: `在你拿到市场的钱之前我们不会向你收费。`,
            fr: `Nous ne voulons pas votre argent tant que vous n’avez pas pris le leur.`,
            ko: `시장에서 먼저 수익을 내기 전까지 비용을 받지 않습니다.`,
            es: `No queremos tu dinero hasta que les hayas ganado.`,
            ja: `相手から利益を得るまでは料金をいただきません。`,
            tr: `Onlarınkini almadan sizden para istemiyoruz.`,
            vi: `Chưa lấy được tiền của thị trường thì chúng tôi không lấy tiền của bạn.`,
            ru: `Мы не хотим ваших денег, пока вы не заработаете их.`,
            de: `Wir wollen Ihr Geld nicht, bis Sie ihres verdient haben.`,
            pt: `Não queremos seu dinheiro até que você tenha ganho o deles.`,
            it: `Non vogliamo i tuoi soldi finché non avrai preso i loro.`,
            ar: `لا نريد أموالك حتى تأخذ أموالهم.`,
            hi: `हम आपका पैसा नहीं चाहते जब तक आपने उनका नहीं लिया है।`,
            pl: `Nie chcemy twoich pieniędzy, dopóki nie weźmiesz ich.`,
            nl: `We willen uw geld niet totdat u het hunne heeft genomen.`
        },
        pricing_plan_initiate: {
            en: `Initiate`,
            zh: `初阶`,
            fr: `Initiate`,
            ko: `Initiate`,
            es: `Initiate`,
            ja: `イニシエイト`,
            tr: `Initiate`,
            vi: `Initiate`,
            ru: `Инициация`,
            de: `Initiieren`,
            pt: `Iniciar`,
            it: `Inizia`,
            ar: `ابدأ`,
            hi: `आरंभ करें`,
            pl: `Inicjuj`,
            nl: `Initiëren`
        },
        pricing_price_free: {
            en: `FREE`,
            zh: `免费`,
            fr: `GRATUIT`,
            ko: `무료`,
            es: `GRATIS`,
            ja: `無料`,
            tr: `ÜCRETSİZ`,
            vi: `MIỄN PHÍ`,
            ru: `БЕСПЛАТНО`,
            de: `KOSTENLOS`,
            pt: `GRÁTIS`,
            it: `GRATIS`,
            ar: `مجاني`,
            hi: `मुफ्त`,
            pl: `DARMOWE`,
            nl: `GRATIS`
        },
        pricing_plan_initiate_feature1: {
            en: `Full Access to Momentum Strategy`,
            zh: `完整动量策略`,
            fr: `Accès complet à la stratégie momentum`,
            ko: `모멘텀 전략 전체 접근`,
            es: `Acceso total a la estrategia Momentum`,
            ja: `モメンタム戦略へフルアクセス`,
            tr: `Momentum stratejisine tam erişim`,
            vi: `Truy cập đầy đủ chiến lược động lượng`,
            ru: `Полный доступ к стратегии импульса`,
            de: `Vollzugriff auf Momentum-Strategie`,
            pt: `Acesso total à estratégia de momentum`,
            it: `Accesso completo alla strategia momentum`,
            ar: `وصول كامل إلى استراتيجية الزخم`,
            hi: `मोमेंटम रणनीति तक पूर्ण पहुंच`,
            pl: `Pełny dostęp do strategii momentum`,
            nl: `Volledige toegang tot momentumstrategie`
        },
        pricing_plan_initiate_feature2: {
            en: `Up to $50,000 Volume / Month`,
            zh: `每月最高 5 万美元成交量`,
            fr: `Jusqu’à 50 000 $ de volume / mois`,
            ko: `월 최대 5만 달러 거래량`,
            es: `Hasta 50 000 $ de volumen / mes`,
            ja: `月間取引量上限 5 万ドル`,
            tr: `Aylık 50.000 $ hacme kadar`,
            vi: `Tối đa 50.000 đô khối lượng mỗi tháng`,
            ru: `До $50,000 объема / месяц`,
            de: `Bis zu $50.000 Volumen / Monat`,
            pt: `Até $50.000 de volume / mês`,
            it: `Fino a $50.000 di volume / mese`,
            ar: `حتى 50,000 دولار حجم / شهر`,
            hi: `प्रति माह $50,000 तक की मात्रा`,
            pl: `Do 50 000 $ wolumenu / miesiąc`,
            nl: `Tot $50.000 volume / maand`
        },
        pricing_plan_initiate_feature3: {
            en: `Local Execution Engine`,
            zh: `本地执行引擎`,
            fr: `Moteur d’exécution local`,
            ko: `로컬 실행 엔진`,
            es: `Motor de ejecución local`,
            ja: `ローカル実行エンジン`,
            tr: `Yerel yürütme motoru`,
            vi: `Động cơ thực thi cục bộ`,
            ru: `Локальный движок выполнения`,
            de: `Lokale Ausführungs-Engine`,
            pt: `Motor de execução local`,
            it: `Motore di esecuzione locale`,
            ar: `محرك التنفيذ المحلي`,
            hi: `स्थानीय निष्पादन इंजन`,
            pl: `Lokalny silnik wykonawczy`,
            nl: `Lokale uitvoeringsengine`
        },
        pricing_plan_initiate_feature4: {
            en: `Real-time Position Tracking`,
            zh: `实时持仓追踪`,
            fr: `Suivi des positions en temps réel`,
            ko: `실시간 포지션 추적`,
            es: `Seguimiento de posiciones en tiempo real`,
            ja: `リアルタイムポジション追跡`,
            tr: `Gerçek zamanlı pozisyon takibi`,
            vi: `Theo dõi vị thế theo thời gian thực`,
            ru: `Отслеживание позиций в реальном времени`,
            de: `Echtzeit-Positionsverfolgung`,
            pt: `Rastreamento de posição em tempo real`,
            it: `Tracciamento posizioni in tempo reale`,
            ar: `تتبع المواضع في الوقت الفعلي`,
            hi: `वास्तविक समय स्थिति ट्रैकिंग`,
            pl: `Śledzenie pozycji w czasie rzeczywistym`,
            nl: `Real-time positievolging`
        },
        pricing_plan_initiate_feature5: {
            en: `Risk Management Tools`,
            zh: `风险管理工具`,
            fr: `Outils de gestion du risque`,
            ko: `리스크 관리 도구`,
            es: `Herramientas de gestión de riesgos`,
            ja: `リスク管理ツール`,
            tr: `Risk yönetimi araçları`,
            vi: `Công cụ quản trị rủi ro`,
            ru: `Инструменты управления рисками`,
            de: `Risikomanagement-Tools`,
            pt: `Ferramentas de gerenciamento de riscos`,
            it: `Strumenti di gestione del rischio`,
            ar: `أدوات إدارة المخاطر`,
            hi: `जोखिम प्रबंधन उपकरण`,
            pl: `Narzędzia zarządzania ryzykiem`,
            nl: `Risicobeheertools`
        },
        pricing_plan_initiate_status: {
            en: `● CURRENT STATUS: ACTIVE`,
            zh: `● 当前状态：激活`,
            fr: `● STATUT ACTUEL : ACTIF`,
            ko: `● 현재 상태: 활성`,
            es: `● ESTADO ACTUAL: ACTIVO`,
            ja: `● 現在の状態：稼働中`,
            tr: `● MEVCUT DURUM: AKTİF`,
            vi: `● TRẠNG THÁI HIỆN TẠI: ĐANG HOẠT ĐỘNG`,
            ru: `● ТЕКУЩИЙ СТАТУС: АКТИВЕН`,
            de: `● AKTUELLER STATUS: AKTIV`,
            pt: `● STATUS ATUAL: ATIVO`,
            it: `● STATO ATTUALE: ATTIVO`,
            ar: `● الحالة الحالية: نشط`,
            hi: `● वर्तमान स्थिति: सक्रिय`,
            pl: `● OBECNY STATUS: AKTYWNY`,
            nl: `● HUIDIGE STATUS: ACTIEF`
        },
        pricing_plan_ascended: {
            en: `Ascended`,
            zh: `晋升`,
            fr: `Ascended`,
            ko: `Ascended`,
            es: `Ascended`,
            ja: `アセンデッド`,
            tr: `Ascended`,
            vi: `Ascended`,
            ru: `Вознесенный`,
            de: `Aufgestiegen`,
            pt: `Ascendido`,
            it: `Asceso`,
            ar: `المتقدم`,
            hi: `उन्नत`,
            pl: `Wzniesiony`,
            nl: `Verheven`
        },
        pricing_price_hidden: {
            en: `???`,
            zh: `???`,
            fr: `???`,
            ko: `???`,
            es: `???`,
            ja: `???`,
            tr: `???`,
            vi: `???`,
            ru: `???`,
            de: `???`,
            pt: `???`,
            it: `???`,
            ar: `???`,
            hi: `???`,
            pl: `???`,
            nl: `???`
        },
        pricing_plan_ascended_feature1: {
            en: `Unlimited Volume`,
            zh: `不限交易量`,
            fr: `Volume illimité`,
            ko: `무제한 거래량`,
            es: `Volumen ilimitado`,
            ja: `無制限の出来高`,
            tr: `Sınırsız hacim`,
            vi: `Khối lượng không giới hạn`,
            ru: `Неограниченный объем`,
            de: `Unbegrenztes Volumen`,
            pt: `Volume ilimitado`,
            it: `Volume illimitato`,
            ar: `حجم غير محدود`,
            hi: `असीमित मात्रा`,
            pl: `Nieograniczony wolumen`,
            nl: `Onbeperkt volume`
        },
        pricing_plan_ascended_feature2: {
            en: `Copy-Trading (Wallet Tracking)`,
            zh: `跟单与钱包跟踪`,
            fr: `Copy-trading (suivi de wallet)`,
            ko: `카피트레이딩 (월렛 추적)`,
            es: `Copy trading (seguimiento de wallet)`,
            ja: `コピートレード（ウォレット追跡）`,
            tr: `Copy trading (cüzdan takibi)`,
            vi: `Copy trading (theo dõi ví)`,
            ru: `Копи-трейдинг (отслеживание кошелька)`,
            de: `Copy-Trading (Wallet-Verfolgung)`,
            pt: `Copy trading (rastreamento de carteira)`,
            it: `Copy trading (tracciamento portafoglio)`,
            ar: `نسخ التداول (تتبع المحفظة)`,
            hi: `कॉपी ट्रेडिंग (वॉलेट ट्रैकिंग)`,
            pl: `Copy trading (śledzenie portfela)`,
            nl: `Copy trading (portemonnee-tracking)`
        },
        pricing_plan_ascended_feature3: {
            en: `MEV Protection`,
            zh: `MEV 保护`,
            fr: `Protection MEV`,
            ko: `MEV 보호`,
            es: `Protección MEV`,
            ja: `MEV 保護`,
            tr: `MEV koruması`,
            vi: `Bảo vệ MEV`,
            ru: `Защита от MEV`,
            de: `MEV-Schutz`,
            pt: `Proteção MEV`,
            it: `Protezione MEV`,
            ar: `حماية MEV`,
            hi: `MEV सुरक्षा`,
            pl: `Ochrona MEV`,
            nl: `MEV-bescherming`
        },
        pricing_plan_ascended_feature4: {
            en: `Advanced Strategies`,
            zh: `高级策略`,
            fr: `Stratégies avancées`,
            ko: `고급 전략`,
            es: `Estrategias avanzadas`,
            ja: `高度な戦略`,
            tr: `İleri stratejiler`,
            vi: `Chiến lược nâng cao`,
            ru: `Продвинутые стратегии`,
            de: `Erweiterte Strategien`,
            pt: `Estratégias avançadas`,
            it: `Strategie avanzate`,
            ar: `استراتيجيات متقدمة`,
            hi: `उन्नत रणनीतियां`,
            pl: `Zaawansowane strategie`,
            nl: `Geavanceerde strategieën`
        },
        pricing_plan_ascended_feature5: {
            en: `Priority Support`,
            zh: `优先支持`,
            fr: `Support prioritaire`,
            ko: `우선 지원`,
            es: `Soporte prioritario`,
            ja: `優先サポート`,
            tr: `Öncelikli destek`,
            vi: `Hỗ trợ ưu tiên`,
            ru: `Приоритетная поддержка`,
            de: `Prioritäts-Support`,
            pt: `Suporte prioritário`,
            it: `Supporto prioritario`,
            ar: `دعم ذو أولوية`,
            hi: `प्राथमिकता समर्थन`,
            pl: `Wsparcie priorytetowe`,
            nl: `Prioriteitsondersteuning`
        },
        pricing_plan_ascended_lock: {
            en: `UNLOCKS AUTOMATICALLY<br><small>Requirement: &gt;$300 Profit via Free Plan</small>`,
            zh: `自动解锁<br><small>条件：免费计划利润超过 300 美元</small>`,
            fr: `DÉVERROUILLAGE AUTOMATIQUE<br><small>Critère : &gt;300 $ de profit avec l’offre gratuite</small>`,
            ko: `자동 해제<br><small>조건: 무료 플랜으로 300달러 이상 수익</small>`,
            es: `SE DESBLOQUEA AUTOMÁTICAMENTE<br><small>Requisito: &gt;300 $ de beneficio en el plan gratuito</small>`,
            ja: `自動アンロック<br><small>条件：無料プランで 300 ドル超の利益</small>`,
            tr: `OTOMATİK AÇILIR<br><small>Şart: Ücretsiz planda 300 $ üzeri kâr</small>`,
            vi: `TỰ ĐỘNG MỞ KHÓA<br><small>Yêu cầu: Lợi nhuận &gt; 300 đô với gói miễn phí</small>`,
            ru: `РАЗБЛОКИРУЕТСЯ АВТОМАТИЧЕСКИ<br><small>Требование: &gt;$300 прибыли через бесплатный план</small>`,
            de: `ENTSPERRT AUTOMATISCH<br><small>Anforderung: &gt;$300 Gewinn über Free-Plan</small>`,
            pt: `DESBLOQUEIA AUTOMATICAMENTE<br><small>Requisito: &gt;$300 de lucro via plano gratuito</small>`,
            it: `SI SBLOCCA AUTOMATICAMENTE<br><small>Requisito: &gt;$300 di profitto tramite piano gratuito</small>`,
            ar: `يفتح تلقائيًا<br><small>المتطلب: &gt;300 دولار ربح عبر الخطة المجانية</small>`,
            hi: `स्वचालित रूप से अनलॉक होता है<br><small>आवश्यकता: मुफ्त योजना के माध्यम से &gt;$300 लाभ</small>`,
            pl: `ODBLOKOWUJE SIĘ AUTOMATYCZNIE<br><small>Wymaganie: &gt;$300 zysku przez darmowy plan</small>`,
            nl: `ONTGRENDELT AUTOMATISCH<br><small>Vereiste: &gt;$300 winst via gratis plan</small>`
        },
        comparison_heading_metric: {
            en: `Comparison`,
            zh: `维度`,
            fr: `Comparaison`,
            ko: `비교`,
            es: `Comparativa`,
            ja: `比較`,
            tr: `Karşılaştırma`,
            vi: `So sánh`,
            ru: `Сравнение`,
            de: `Vergleich`,
            pt: `Comparação`,
            it: `Confronto`,
            ar: `مقارنة`,
            hi: `तुलना`,
            pl: `Porównanie`,
            nl: `Vergelijking`
        },
        comparison_heading_nexus: {
            en: `NexusTools`,
            zh: `NexusTools`,
            fr: `NexusTools`,
            ko: `NexusTools`,
            es: `NexusTools`,
            ja: `NexusTools`,
            tr: `NexusTools`,
            vi: `NexusTools`,
            ru: `NexusTools`,
            de: `NexusTools`,
            pt: `NexusTools`,
            it: `NexusTools`,
            ar: `NexusTools`,
            hi: `NexusTools`,
            pl: `NexusTools`,
            nl: `NexusTools`
        },
        comparison_heading_cloud: {
            en: `Typical Cloud Bot`,
            zh: `典型云端机器人`,
            fr: `Bot cloud classique`,
            ko: `일반 클라우드 봇`,
            es: `Bot en la nube típico`,
            ja: `一般的なクラウドボット`,
            tr: `Tipik bulut botu`,
            vi: `Bot đám mây điển hình`,
            ru: `Типичный облачный бот`,
            de: `Typischer Cloud-Bot`,
            pt: `Bot em nuvem típico`,
            it: `Bot cloud tipico`,
            ar: `بوت سحابي نموذجي`,
            hi: `विशिष्ट क्लाउड बॉट`,
            pl: `Typowy bot w chmurze`,
            nl: `Typische cloud-bot`
        },
        comparison_row_security: {
            en: `Security`,
            zh: `安全`,
            fr: `Sécurité`,
            ko: `보안`,
            es: `Seguridad`,
            ja: `セキュリティ`,
            tr: `Güvenlik`,
            vi: `Bảo mật`,
            ru: `Безопасность`,
            de: `Sicherheit`,
            pt: `Segurança`,
            it: `Sicurezza`,
            ar: `الأمان`,
            hi: `सुरक्षा`,
            pl: `Bezpieczeństwo`,
            nl: `Beveiliging`
        },
        comparison_security_good: {
            en: `✓ 100% Local (No Keys)`,
            zh: `✓ 百分百本地（无密钥）`,
            fr: `✓ 100 % local (aucune clé)`,
            ko: `✓ 100% 로컬 (키 없음)`,
            es: `✓ 100 % local (sin claves)`,
            ja: `✓ 100% ローカル（キー不要）`,
            tr: `✓ %100 yerel (anahtar yok)`,
            vi: `✓ 100% cục bộ (không cần key)`,
            ru: `✓ 100% Локально (Без ключей)`,
            de: `✓ 100% Lokal (Keine Schlüssel)`,
            pt: `✓ 100% Local (Sem chaves)`,
            it: `✓ 100% Locale (Nessuna chiave)`,
            ar: `✓ 100% محلي (بدون مفاتيح)`,
            hi: `✓ 100% स्थानीय (कोई कुंजी नहीं)`,
            pl: `✓ 100% Lokalnie (Bez kluczy)`,
            nl: `✓ 100% Lokaal (Geen sleutels)`
        },
        comparison_security_bad: {
            en: `✗ Requires API Keys`,
            zh: `✗ 需要 API 密钥`,
            fr: `✗ Nécessite des clés API`,
            ko: `✗ API 키 필요`,
            es: `✗ Requiere claves API`,
            ja: `✗ API キーが必要`,
            tr: `✗ API anahtarı gerekir`,
            vi: `✗ Cần API key`,
            ru: `✗ Требует API ключи`,
            de: `✗ Benötigt API-Schlüssel`,
            pt: `✗ Requer chaves API`,
            it: `✗ Richiede chiavi API`,
            ar: `✗ يتطلب مفاتيح API`,
            hi: `✗ API कुंजी की आवश्यकता है`,
            pl: `✗ Wymaga kluczy API`,
            nl: `✗ Vereist API-sleutels`
        },
        comparison_row_cost: {
            en: `Cost`,
            zh: `成本`,
            fr: `Coût`,
            ko: `비용`,
            es: `Costo`,
            ja: `コスト`,
            tr: `Maliyet`,
            vi: `Chi phí`,
            ru: `Стоимость`,
            de: `Kosten`,
            pt: `Custo`,
            it: `Costo`,
            ar: `التكلفة`,
            hi: `लागत`,
            pl: `Koszt`,
            nl: `Kosten`
        },
        comparison_cost_good: {
            en: `✓ Free until profitable`,
            zh: `✓ 盈利前免费`,
            fr: `✓ Gratuit jusqu’au profit`,
            ko: `✓ 수익 나기 전까지 무료`,
            es: `✓ Gratis hasta ser rentable`,
            ja: `✓ 利益が出るまで無料`,
            tr: `✓ Kâra kadar ücretsiz`,
            vi: `✓ Miễn phí cho đến khi bạn có lãi`,
            ru: `✓ Бесплатно до прибыльности`,
            de: `✓ Kostenlos bis profitabel`,
            pt: `✓ Grátis até ser rentável`,
            it: `✓ Gratuito fino a quando è redditizio`,
            ar: `✓ مجاني حتى تكون مربحًا`,
            hi: `✓ लाभदायक होने तक मुफ्त`,
            pl: `✓ Darmowe do momentu osiągnięcia zysku`,
            nl: `✓ Gratis totdat het winstgevend is`
        },
        comparison_cost_bad: {
            en: `✗ $49-99/mo Upfront`,
            zh: `✗ 需先付 $49-99/月`,
            fr: `✗ 49-99 $/mois à payer d’avance`,
            ko: `✗ 월 49~99달러 선결제`,
            es: `✗ 49-99 $/mes por adelantado`,
            ja: `✗ 月額 49～99 ドルを前払い`,
            tr: `✗ Ayda 49-99 $ peşin`,
            vi: `✗ Trả trước 49-99 đô mỗi tháng`,
            ru: `✗ $49-99/мес заранее`,
            de: `✗ $49-99/Monat im Voraus`,
            pt: `✗ $49-99/mês antecipado`,
            it: `✗ $49-99/mese anticipato`,
            ar: `✗ 49-99 دولار/شهر مقدماً`,
            hi: `✗ $49-99/माह अग्रिम`,
            pl: `✗ $49-99/mies. z góry`,
            nl: `✗ $49-99/maand vooraf`
        },
        comparison_row_install: {
            en: `Installation`,
            zh: `部署`,
            fr: `Installation`,
            ko: `설치`,
            es: `Instalación`,
            ja: `導入`,
            tr: `Kurulum`,
            vi: `Cài đặt`,
            ru: `Установка`,
            de: `Installation`,
            pt: `Instalação`,
            it: `Installazione`,
            ar: `التثبيت`,
            hi: `स्थापना`,
            pl: `Instalacja`,
            nl: `Installatie`
        },
        comparison_install_good: {
            en: `✓ Drag & Drop (3s)`,
            zh: `✓ 拖拽安装（3 秒）`,
            fr: `✓ Glisser-déposer (3 s)`,
            ko: `✓ 드래그 앤 드롭 (3초)`,
            es: `✓ Arrastrar y soltar (3 s)`,
            ja: `✓ ドラッグ＆ドロップ（3秒）`,
            tr: `✓ Sürükle bırak (3 sn)`,
            vi: `✓ Kéo thả (3 giây)`,
            ru: `✓ Перетаскивание (3с)`,
            de: `✓ Drag & Drop (3s)`,
            pt: `✓ Arrastar e soltar (3s)`,
            it: `✓ Trascina e rilascia (3s)`,
            ar: `✓ السحب والإفلات (3 ثوان)`,
            hi: `✓ खींचें और छोड़ें (3s)`,
            pl: `✓ Przeciągnij i upuść (3s)`,
            nl: `✓ Slepen en neerzetten (3s)`
        },
        comparison_install_bad: {
            en: `✗ Complex Config`,
            zh: `✗ 配置复杂`,
            fr: `✗ Configuration complexe`,
            ko: `✗ 복잡한 설정`,
            es: `✗ Configuración compleja`,
            ja: `✗ 設定が複雑`,
            tr: `✗ Karmaşık yapılandırma`,
            vi: `✗ Cấu hình phức tạp`,
            ru: `✗ Сложная конфигурация`,
            de: `✗ Komplexe Konfiguration`,
            pt: `✗ Configuração complexa`,
            it: `✗ Configurazione complessa`,
            ar: `✗ تكوين معقد`,
            hi: `✗ जटिल कॉन्फ़िग`,
            pl: `✗ Złożona konfiguracja`,
            nl: `✗ Complexe configuratie`
        },
        comparison_row_ban: {
            en: `Bannable?`,
            zh: `会被封禁吗`,
            fr: `Bannissable ?`,
            ko: `차단될까?`,
            es: `¿Puede ser baneado?`,
            ja: `BAN の危険？`,
            tr: `Ban riski?`,
            vi: `Có bị cấm không?`,
            ru: `Может быть забанен?`,
            de: `Bannbar?`,
            pt: `Pode ser banido?`,
            it: `Può essere bannato?`,
            ar: `هل يمكن حظره؟`,
            hi: `प्रतिबंधित किया जा सकता है?`,
            pl: `Można zbanować?`,
            nl: `Bannable?`
        },
        comparison_ban_good: {
            en: `✓ No (Undetectable)`,
            zh: `✓ 不会（无法识别）`,
            fr: `✓ Non (indétectable)`,
            ko: `✓ 아님 (탐지 불가)`,
            es: `✓ No (indetectable)`,
            ja: `✓ いいえ（検知不能）`,
            tr: `✓ Hayır (tespit edilemez)`,
            vi: `✓ Không (không thể phát hiện)`,
            ru: `✓ Нет (Необнаружим)`,
            de: `✓ Nein (Nicht erkennbar)`,
            pt: `✓ Não (Indetectável)`,
            it: `✓ No (Individuabile)`,
            ar: `✓ لا (غير قابل للكشف)`,
            hi: `✓ नहीं (अपरिहार्य)`,
            pl: `✓ Nie (Niewykrywalny)`,
            nl: `✓ Nee (Niet detecteerbaar)`
        },
        comparison_ban_bad: {
            en: `✗ Yes (IP Flagging)`,
            zh: `✗ 会（IP 标记）`,
            fr: `✗ Oui (IP flaggée)`,
            ko: `✗ 예 (IP 플래그)`,
            es: `✗ Sí (IP marcada)`,
            ja: `✗ はい（IP 監視）`,
            tr: `✗ Evet (IP işaretlenir)`,
            vi: `✗ Có (dễ bị gắn cờ IP)`,
            ru: `✗ Да (Флаг IP)`,
            de: `✗ Ja (IP-Markierung)`,
            pt: `✗ Sim (Marcação de IP)`,
            it: `✗ Sì (Marcatura IP)`,
            ar: `✗ نعم (وضع علامة على IP)`,
            hi: `✗ हाँ (IP फ्लैगिंग)`,
            pl: `✗ Tak (Oznaczenie IP)`,
            nl: `✗ Ja (IP-markering)`
        },
        comparison_row_latency: {
            en: `Latency`,
            zh: `延迟`,
            fr: `Latence`,
            ko: `지연`,
            es: `Latencia`,
            ja: `レイテンシ`,
            tr: `Gecikme`,
            vi: `Độ trễ`,
            ru: `Задержка`,
            de: `Latenz`,
            pt: `Latência`,
            it: `Latenza`,
            ar: `زمن الانتقال`,
            hi: `विलंब`,
            pl: `Opóźnienie`,
            nl: `Latentie`
        },
        comparison_latency_good: {
            en: `✓ 4ms (Local)`,
            zh: `✓ 4ms（本地）`,
            fr: `✓ 4 ms (local)`,
            ko: `✓ 4ms (로컬)`,
            es: `✓ 4 ms (local)`,
            ja: `✓ 4ms（ローカル）`,
            tr: `✓ 4 ms (yerel)`,
            vi: `✓ 4ms (cục bộ)`,
            ru: `✓ 4мс (Локально)`,
            de: `✓ 4ms (Lokal)`,
            pt: `✓ 4ms (Local)`,
            it: `✓ 4ms (Locale)`,
            ar: `✓ 4ms (محلي)`,
            hi: `✓ 4ms (स्थानीय)`,
            pl: `✓ 4ms (Lokalnie)`,
            nl: `✓ 4ms (Lokaal)`
        },
        comparison_latency_bad: {
            en: `✗ 50-200ms (Server)`,
            zh: `✗ 50-200ms（服务器）`,
            fr: `✗ 50-200 ms (serveur)`,
            ko: `✗ 50-200ms (서버)`,
            es: `✗ 50-200 ms (servidor)`,
            ja: `✗ 50-200ms（サーバー）`,
            tr: `✗ 50-200 ms (sunucu)`,
            vi: `✗ 50-200ms (máy chủ)`,
            ru: `✗ 50-200мс (Сервер)`,
            de: `✗ 50-200ms (Server)`,
            pt: `✗ 50-200ms (Servidor)`,
            it: `✗ 50-200ms (Server)`,
            ar: `✗ 50-200ms (الخادم)`,
            hi: `✗ 50-200ms (सर्वर)`,
            pl: `✗ 50-200ms (Serwer)`,
            nl: `✗ 50-200ms (Server)`
        },
        faq_tag: {
            en: `Clarity Protocol`,
            zh: `清晰协议`,
            fr: `Clarity Protocol`,
            ko: `Clarity 프로토콜`,
            es: `Clarity Protocol`,
            ja: `Clarity Protocol`,
            tr: `Clarity Protocol`,
            vi: `Clarity Protocol`,
            ru: `Протокол ясности`,
            de: `Klarheitsprotokoll`,
            pt: `Protocolo Clarity`,
            it: `Protocollo Clarity`,
            ar: `بروتوكول الوضوح`,
            hi: `क्लैरिटी प्रोटोकॉल`,
            pl: `Protokół Clarity`,
            nl: `Clarity-protocol`
        },
        faq_title: {
            en: `Answers you need before deploying capital`,
            zh: `在投入资金前必读答案`,
            fr: `Les réponses indispensables avant d’engager du capital`,
            ko: `자금을 투입하기 전에 필요한 답변`,
            es: `Respuestas que necesitas antes de poner capital`,
            ja: `資金投入前に知るべき回答`,
            tr: `Sermaye koymadan önce bilmeniz gereken yanıtlar`,
            vi: `Những câu trả lời bạn cần trước khi bỏ vốn`,
            ru: `Ответы, которые вам нужны перед развертыванием капитала`,
            de: `Antworten, die Sie vor dem Einsatz von Kapital benötigen`,
            pt: `Respostas que você precisa antes de implantar capital`,
            it: `Risposte di cui hai bisogno prima di impiegare capitale`,
            ar: `الإجابات التي تحتاجها قبل نشر رأس المال`,
            hi: `पूंजी तैनात करने से पहले आपको जिन उत्तरों की आवश्यकता है`,
            pl: `Odpowiedzi, których potrzebujesz przed wdrożeniem kapitału`,
            nl: `Antwoorden die u nodig heeft voordat u kapitaal inzet`
        },
        faq_desc: {
            en: `Every decision we make centers on client-side safety. Here is exactly what that means in practice.`,
            zh: `所有决策都围绕客户端安全展开。以下是具体做法。`,
            fr: `Chaque décision est guidée par la sécurité côté client. Voici ce que cela signifie concrètement.`,
            ko: `모든 결정은 클라이언트 보안을 중심으로 이루어집니다. 실제로는 이렇게 작동합니다.`,
            es: `Cada decisión gira en torno a la seguridad del lado del cliente. Así es como se aplica.`,
            ja: `すべての意思決定はクライアント側の安全を中心にしています。実際にはこういうことです。`,
            tr: `Tüm kararlarımız istemci tarafı güvenliği etrafında şekillenir. Uygulamada bunun anlamı budur.`,
            vi: `Mọi quyết định đều xoay quanh sự an toàn phía khách hàng. Đây là cách chúng tôi thực hiện.`,
            ru: `Каждое решение, которое мы принимаем, сосредоточено на безопасности на стороне клиента. Вот что это означает на практике.`,
            de: `Jede Entscheidung, die wir treffen, konzentriert sich auf die Sicherheit auf der Client-Seite. Hier ist genau, was das in der Praxis bedeutet.`,
            pt: `Cada decisão que tomamos se concentra na segurança do lado do cliente. Aqui está exatamente o que isso significa na prática.`,
            it: `Ogni decisione che prendiamo si concentra sulla sicurezza lato client. Ecco esattamente cosa significa nella pratica.`,
            ar: `كل قرار نتخذه يركز على الأمان من جانب العميل. إليك بالضبط ما يعنيه ذلك في الممارسة.`,
            hi: `हम जो भी निर्णय लेते हैं वह क्लाइंट-साइड सुरक्षा पर केंद्रित होता है। व्यवहार में इसका वास्तव में क्या मतलब है यहां है।`,
            pl: `Każda decyzja, którą podejmujemy, koncentruje się na bezpieczeństwie po stronie klienta. Oto dokładnie, co to oznacza w praktyce.`,
            nl: `Elke beslissing die we nemen draait om client-side veiligheid. Dit is precies wat dat in de praktijk betekent.`
        },
        faq1_label: {
            en: `Safety`,
            zh: `安全`,
            fr: `Sécurité`,
            ko: `안전`,
            es: `Seguridad`,
            ja: `安全`,
            tr: `Güvenlik`,
            vi: `An toàn`,
            ru: `Безопасность`,
            de: `Sicherheit`,
            pt: `Segurança`,
            it: `Sicurezza`,
            ar: `الأمان`,
            hi: `सुरक्षा`,
            pl: `Bezpieczeństwo`,
            nl: `Veiligheid`
        },
        faq1_question: {
            en: `Is my account protected?`,
            zh: `我的账户安全吗？`,
            fr: `Mon compte est-il protégé ?`,
            ko: `내 계좌는 안전한가요?`,
            es: `¿Mi cuenta está protegida?`,
            ja: `口座は守られていますか？`,
            tr: `Hesabım korunuyor mu?`,
            vi: `Tài khoản của tôi có an toàn không?`,
            ru: `Защищен ли мой аккаунт?`,
            de: `Ist mein Konto geschützt?`,
            pt: `Minha conta está protegida?`,
            it: `Il mio account è protetto?`,
            ar: `هل حسابي محمي؟`,
            hi: `क्या मेरा खाता सुरक्षित है?`,
            pl: `Czy moje konto jest chronione?`,
            nl: `Is mijn account beschermd?`
        },
        faq1_answer: {
            en: `Yes. NexusTools lives inside the Hyperliquid tab that is already open. The script touches only the buttons you see, never asks for private keys and cannot send data outside <span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span>.`,
            zh: `安全。NexusTools 仅在已打开的 Hyperliquid 标签页中运行。脚本只点击你看到的按钮，从不索要私钥也不会把数据发出 <span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span>。`,
            fr: `Oui. NexusTools reste dans l’onglet Hyperliquid déjà ouvert. Le script ne touche qu’aux boutons visibles, ne demande jamais de clé privée et ne sort jamais de <span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span>.`,
            ko: `안전합니다. NexusTools 는 이미 열려 있는 Hyperliquid 탭 안에서만 동작합니다. 스크립트는 보이는 버튼만 클릭하며 프라이빗 키를 묻지 않고 데이터를 <span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span> 밖으로 보낼 수 없습니다.`,
            es: `Sí. NexusTools vive en la pestaña de Hyperliquid que ya tienes abierta. Solo presiona los botones que ves, nunca pide claves privadas y no puede sacar datos fuera de <span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span>.`,
            ja: `はい。NexusTools は開いている Hyperliquid のタブだけで動作します。表示されているボタンしか操作せず秘密鍵を求めず、データを <span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span> の外へ送れません。`,
            tr: `Evet. NexusTools yalnızca açık olan Hyperliquid sekmesinde yaşar. Sadece gördüğünüz düğmelere dokunur, özel anahtar istemez ve veriyi <span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span> dışına çıkaramaz.`,
            vi: `Có. NexusTools chỉ chạy trong tab Hyperliquid đang mở. Script chỉ nhấn các nút bạn nhìn thấy, không bao giờ hỏi khóa riêng và không thể gửi dữ liệu ra ngoài <span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span>.`,
            ru: `Да. NexusTools работает внутри уже открытой вкладки Hyperliquid. Скрипт касается только видимых кнопок, никогда не запрашивает приватные ключи и не может отправлять данные за пределы <span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span>.`,
            de: `Ja. NexusTools lebt innerhalb des bereits geöffneten Hyperliquid-Tabs. Das Skript berührt nur die sichtbaren Schaltflächen, fragt niemals nach privaten Schlüsseln und kann keine Daten außerhalb von <span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span> senden.`,
            pt: `Sim. NexusTools vive dentro da aba Hyperliquid que já está aberta. O script toca apenas nos botões que você vê, nunca pede chaves privadas e não pode enviar dados fora de <span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span>.`,
            it: `Sì. NexusTools vive all'interno della scheda Hyperliquid già aperta. Lo script tocca solo i pulsanti che vedi, non chiede mai chiavi private e non può inviare dati al di fuori di <span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span>.`,
            ar: `نعم. يعيش NexusTools داخل علامة تبويب Hyperliquid المفتوحة بالفعل. يلمس السكريبت الأزرار التي تراها فقط، ولا يطلب أبدًا المفاتيح الخاصة ولا يمكنه إرسال البيانات خارج <span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span>.`,
            hi: `हाँ। NexusTools पहले से खुले Hyperliquid टैब के अंदर रहता है। स्क्रिप्ट केवल आपके द्वारा देखे गए बटनों को छूती है, कभी भी निजी कुंजी नहीं मांगती है और <span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span> के बाहर डेटा नहीं भेज सकती है।`,
            pl: `Tak. NexusTools działa wewnątrz już otwartej zakładki Hyperliquid. Skrypt dotyka tylko widocznych przycisków, nigdy nie prosi o klucze prywatne i nie może wysyłać danych poza <span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span>.`,
            nl: `Ja. NexusTools leeft binnen het al geopende Hyperliquid-tabblad. Het script raakt alleen de knoppen aan die u ziet, vraagt nooit om privésleutels en kan geen gegevens buiten <span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span> verzenden.`
        },
        faq2_label: {
            en: `Pricing`,
            zh: `定价`,
            fr: `Tarifs`,
            ko: `요금`,
            es: `Precio`,
            ja: `料金`,
            tr: `Fiyat`,
            vi: `Giá`,
            ru: `Цены`,
            de: `Preise`,
            pt: `Preços`,
            it: `Prezzi`,
            ar: `الأسعار`,
            hi: `मूल्य निर्धारण`,
            pl: `Cennik`,
            nl: `Prijzen`
        },
        faq2_question: {
            en: `Why is the premium price hidden?`,
            zh: `为什么高级价格隐藏？`,
            fr: `Pourquoi le prix premium est-il masqué ?`,
            ko: `프리미엄 요금이 왜 숨겨져 있나요?`,
            es: `¿Por qué el precio premium está oculto?`,
            ja: `プレミアム価格が表示されないのはなぜ？`,
            tr: `Premium fiyat neden gizli?`,
            vi: `Tại sao giá gói cao cấp lại ẩn?`,
            ru: `Почему премиум цена скрыта?`,
            de: `Warum ist der Premium-Preis versteckt?`,
            pt: `Por que o preço premium está oculto?`,
            it: `Perché il prezzo premium è nascosto?`,
            ar: `لماذا السعر المميز مخفي؟`,
            hi: `प्रीमियम मूल्य क्यों छुपा हुआ है?`,
            pl: `Dlaczego cena premium jest ukryta?`,
            nl: `Waarom is de premiumprijs verborgen?`
        },
        faq2_answer: {
            en: `Because we charge only after you win. Once the dashboard records more than $300 of realized profit that came from NexusTools entries the upgrade switch appears. Until that moment every feature stays free.`,
            zh: `因为只有你盈利后我们才收费。当仪表盘记录到来自 NexusTools 的利润超过 300 美元时升级开关才会出现。在那之前所有功能都免费。`,
            fr: `Parce que nous ne facturons qu’après votre réussite. Dès que le tableau de bord enregistre plus de 300 $ de gains réalisés via NexusTools, le bouton d’upgrade apparaît. Avant cela tout reste gratuit.`,
            ko: `당신이 수익을 낸 뒤에만 요금을 받습니다. NexusTools 로 발생한 실현 수익이 300달러를 넘으면 업그레이드 스위치가 나타납니다. 그전까지 모든 기능은 무료입니다.`,
            es: `Porque solo cobramos cuando ganas. Cuando el panel registra más de 300 $ de beneficio generado con NexusTools, aparece el interruptor de upgrade. Hasta entonces todas las funciones son gratis.`,
            ja: `勝ってからでないと料金をいただきません。NexusTools のエントリーで実現利益が 300 ドルを超えるとアップグレードボタンが現れます。それまでは全機能が無料です。`,
            tr: `Çünkü yalnızca kazandıktan sonra ücret alıyoruz. NexusTools sayesinde gerçekleşen kâr 300 $’ı aşınca yükseltme anahtarı görünür. O ana kadar tüm özellikler ücretsizdir.`,
            vi: `Vì chúng tôi chỉ thu phí sau khi bạn thắng. Khi dashboard ghi nhận lợi nhuận hơn 300 đô do NexusTools tạo ra, nút nâng cấp mới xuất hiện. Trước đó mọi tính năng đều miễn phí.`,
            ru: `Потому что мы взимаем плату только после того, как вы выиграете. Как только панель управления зафиксирует более $300 реализованной прибыли от записей NexusTools, появится переключатель обновления. До этого момента все функции остаются бесплатными.`,
            de: `Weil wir nur abrechnen, nachdem Sie gewonnen haben. Sobald das Dashboard mehr als $300 realisierten Gewinn aus NexusTools-Einträgen verzeichnet, erscheint der Upgrade-Schalter. Bis zu diesem Moment bleiben alle Funktionen kostenlos.`,
            pt: `Porque cobramos apenas depois que você ganha. Quando o painel registra mais de $300 de lucro realizado que veio de entradas do NexusTools, o interruptor de upgrade aparece. Até esse momento, todos os recursos permanecem gratuitos.`,
            it: `Perché addebitiamo solo dopo che hai vinto. Una volta che la dashboard registra più di $300 di profitto realizzato proveniente dalle voci di NexusTools, appare l'interruttore di upgrade. Fino a quel momento ogni funzione rimane gratuita.`,
            ar: `لأننا نتقاضى رسومًا فقط بعد أن تفوز. بمجرد أن يسجل لوحة المعلومات أكثر من 300 دولار من الربح المحقق الذي جاء من إدخالات NexusTools، يظهر مفتاح الترقية. حتى تلك اللحظة تبقى كل الميزات مجانية.`,
            hi: `क्योंकि हम केवल तभी शुल्क लेते हैं जब आप जीतते हैं। एक बार डैशबोर्ड NexusTools प्रविष्टियों से आने वाले $300 से अधिक के प्राप्त लाभ को रिकॉर्ड करता है, तो अपग्रेड स्विच दिखाई देता है। उस क्षण तक हर सुविधा मुफ्त रहती है।`,
            pl: `Ponieważ pobieramy opłaty dopiero po wygranej. Gdy panel rejestruje więcej niż $300 zrealizowanego zysku pochodzącego z wpisów NexusTools, pojawia się przełącznik aktualizacji. Do tego momentu wszystkie funkcje pozostają bezpłatne.`,
            nl: `Omdat we alleen kosten in rekening brengen nadat u heeft gewonnen. Zodra het dashboard meer dan $300 gerealiseerde winst registreert die afkomstig is van NexusTools-invoeren, verschijnt de upgrade-schakelaar. Tot dat moment blijven alle functies gratis.`
        },
        faq3_label: {
            en: `Devices`,
            zh: `设备`,
            fr: `Appareils`,
            ko: `기기`,
            es: `Dispositivos`,
            ja: `デバイス`,
            tr: `Cihazlar`,
            vi: `Thiết bị`,
            ru: `Устройства`,
            de: `Geräte`,
            pt: `Dispositivos`,
            it: `Dispositivi`,
            ar: `الأجهزة`,
            hi: `उपकरण`,
            pl: `Urządzenia`,
            nl: `Apparaten`
        },
        faq3_question: {
            en: `Can I run it on my phone?`,
            zh: `手机能用吗？`,
            fr: `Puis-je l’utiliser sur mon téléphone ?`,
            ko: `휴대폰에서도 실행할 수 있나요?`,
            es: `¿Puedo usarlo en mi teléfono?`,
            ja: `スマホでも動きますか？`,
            tr: `Telefonumda çalışır mı?`,
            vi: `Tôi chạy được trên điện thoại không?`,
            ru: `Могу ли я запустить его на телефоне?`,
            de: `Kann ich es auf meinem Telefon ausführen?`,
            pt: `Posso executá-lo no meu telefone?`,
            it: `Posso eseguirlo sul mio telefono?`,
            ar: `هل يمكنني تشغيله على هاتفي؟`,
            hi: `क्या मैं इसे अपने फोन पर चला सकता हूं?`,
            pl: `Czy mogę uruchomić to na moim telefonie?`,
            nl: `Kan ik het op mijn telefoon uitvoeren?`
        },
        faq3_answer: {
            en: `It works in any browser that supports JavaScript bookmarks including some mobile browsers. For the best latency and full DOM control we still recommend a desktop tab in Chrome, Brave or Arc.`,
            zh: `任何支持 JavaScript 书签的浏览器都能运行包括部分移动端。为获得最低延迟与完整 DOM 控制仍推荐在桌面端的 Chrome、Brave 或 Arc 使用。`,
            fr: `Il fonctionne dans tout navigateur supportant les bookmarklets JavaScript, y compris certains mobiles. Pour la meilleure latence et un contrôle DOM complet, nous recommandons toujours un onglet desktop sous Chrome, Brave ou Arc.`,
            ko: `JavaScript 북마크를 지원하는 모든 브라우저에서 동작하며 일부 모바일 브라우저도 포함됩니다. 최저 지연과 완전한 DOM 제어를 위해서는 Chrome, Brave, Arc 의 데스크톱 탭을 권장합니다.`,
            es: `Funciona en cualquier navegador que soporte bookmarklets de JavaScript, incluidos algunos móviles. Para la mejor latencia y control DOM completo seguimos recomendando una pestaña de escritorio en Chrome, Brave o Arc.`,
            ja: `JavaScript ブックマークレットに対応するブラウザならモバイルでも動作します。とはいえ最低のレイテンシと DOM 制御のためにデスクトップ版 Chrome・Brave・Arc を推奨します。`,
            tr: `JavaScript yer imlerini destekleyen tüm tarayıcılarda çalışır, bazı mobil tarayıcılar da dahil. En düşük gecikme ve tam DOM kontrolü için yine de masaüstü Chrome Brave veya Arc sekmesini öneririz.`,
            vi: `Chạy được trên mọi trình duyệt hỗ trợ bookmarklet JavaScript kể cả một số trình duyệt di động. Tuy vậy để có độ trễ thấp nhất và kiểm soát DOM đầy đủ chúng tôi vẫn khuyên dùng tab desktop trên Chrome Brave hoặc Arc.`,
            ru: `Работает в любом браузере, поддерживающем закладки JavaScript, включая некоторые мобильные. Для лучшей задержки и полного контроля DOM мы по-прежнему рекомендуем десктопную вкладку в Chrome, Brave или Arc.`,
            de: `Funktioniert in jedem Browser, der JavaScript-Lesezeichen unterstützt, einschließlich mancher mobiler Browser. Für die beste Latenz und volle DOM-Kontrolle empfehlen wir weiterhin einen Desktop-Tab in Chrome, Brave oder Arc.`,
            pt: `Funciona em qualquer navegador que suporte favoritos em JavaScript, incluindo alguns navegadores móveis. Para a melhor latência e controle total do DOM ainda recomendamos uma aba desktop no Chrome, Brave ou Arc.`,
            it: `Funziona in qualsiasi browser che supporti i segnalibri JavaScript, inclusi alcuni browser mobili. Per la latenza migliore e il pieno controllo del DOM consigliamo comunque una scheda desktop in Chrome, Brave o Arc.`,
            ar: `يعمل في أي متصفح يدعم إشارات JavaScript المرجعية بما في ذلك بعض متصفحات الهاتف. للحصول على أفضل زمن وصول وتحكم كامل في DOM لا نزال نوصي بعلامة تبويب سطح مكتب في Chrome أو Brave أو Arc.`,
            hi: `यह किसी भी ब्राउज़र में काम करता है जो जावास्क्रिप्ट बुकमार्क को सपोर्ट करता है, कुछ मोबाइल ब्राउज़र भी शामिल हैं। सर्वोत्तम विलंबता और पूर्ण DOM नियंत्रण के लिए हम अभी भी Chrome, Brave या Arc में डेस्कटॉप टैब की सलाह देते हैं।`,
            pl: `Działa w każdej przeglądarce obsługującej zakładki JavaScript, w tym w niektórych mobilnych. Dla najlepszej latencji i pełnej kontroli DOM nadal polecamy kartę desktopową w Chrome, Brave lub Arc.`,
            nl: `Werkt in elke browser die JavaScript-bladwijzers ondersteunt, inclusief sommige mobiele browsers. Voor de beste latentie en volledige DOM-regie raden we nog steeds een desktop-tabblad in Chrome, Brave of Arc aan.`
        },
        footer_link_setup: {
            en: `Setup Guide`,
            zh: `设置指南`,
            fr: `Guide d’installation`,
            ko: `설치 가이드`,
            es: `Guía de instalación`,
            ja: `セットアップガイド`,
            tr: `Kurulum rehberi`,
            vi: `Hướng dẫn thiết lập`,
            ru: `Руководство по настройке`,
            de: `Einrichtungsanleitung`,
            pt: `Guia de configuração`,
            it: `Guida all’installazione`,
            ar: `دليل الإعداد`,
            hi: `सेटअप गाइड`,
            pl: `Przewodnik konfiguracji`,
            nl: `Installatiehandleiding`
        },
        footer_link_pricing: {
            en: `Pricing`,
            zh: `定价`,
            fr: `Tarifs`,
            ko: `요금`,
            es: `Precios`,
            ja: `料金`,
            tr: `Fiyatlandırma`,
            vi: `Bảng giá`,
            ru: `Цены`,
            de: `Preise`,
            pt: `Preços`,
            it: `Prezzi`,
            ar: `الأسعار`,
            hi: `मूल्य निर्धारण`,
            pl: `Cennik`,
            nl: `Prijzen`
        },
        footer_link_email: {
            en: `Email`,
            zh: `电子邮件`,
            fr: `Email`,
            ko: `이메일`,
            es: `Correo`,
            ja: `メール`,
            tr: `E-posta`,
            vi: `Email`,
            ru: `Email`,
            de: `E-Mail`,
            pt: `Email`,
            it: `Email`,
            ar: `البريد الإلكتروني`,
            hi: `ईमेल`,
            pl: `Email`,
            nl: `E-mail`
        },
        footer_link_social: {
            en: `X (Formerly Twitter)`,
            zh: `X（原 Twitter）`,
            fr: `X (ex-Twitter)`,
            ko: `X (구 Twitter)`,
            es: `X (antes Twitter)`,
            ja: `X（旧Twitter）`,
            tr: `X (eski Twitter)`,
            vi: `X (trước đây là Twitter)`,
            ru: `X (бывший Twitter)`,
            de: `X (ehemals Twitter)`,
            pt: `X (antigo Twitter)`,
            it: `X (ex Twitter)`,
            ar: `X (تويتر سابقًا)`,
            hi: `X (पूर्व Twitter)`,
            pl: `X (dawniej Twitter)`,
            nl: `X (voorheen Twitter)`
        },
        footer_contact_title: {
            en: `Contact`,
            zh: `联系`,
            fr: `Contact`,
            ko: `문의`,
            es: `Contacto`,
            ja: `連絡先`,
            tr: `İletişim`,
            vi: `Liên hệ`,
            ru: `Контакт`,
            de: `Kontakt`,
            pt: `Contato`,
            it: `Contatto`,
            ar: `اتصال`,
            hi: `संपर्क`,
            pl: `Kontakt`,
            nl: `Contact`
        },
        footer_compliance_title: {
            en: `Compliance`,
            zh: `合规`,
            fr: `Conformité`,
            ko: `컴플라이언스`,
            es: `Cumplimiento`,
            ja: `コンプライアンス`,
            tr: `Uyumluluk`,
            vi: `Tuân thủ`,
            ru: `Соответствие`,
            de: `Compliance`,
            pt: `Conformidade`,
            it: `Compliance`,
            ar: `الامتثال`,
            hi: `अनुपालन`,
            pl: `Zgodność`,
            nl: `Compliance`
        },
        footer_compliance_line1: {
            en: `Runs only on <span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span>`,
            zh: `仅在 <span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span> 上运行`,
            fr: `Fonctionne uniquement sur <span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span>`,
            ko: `<span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span> 에서만 작동`,
            es: `Solo se ejecuta en <span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span>`,
            ja: `<span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span> 上でのみ動作`,
            tr: `Sadece <span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span> üzerinde çalışır`,
            vi: `Chỉ chạy trên <span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span>`,
            ru: `Работает только на <span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span>`,
            de: `Läuft nur auf <span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span>`,
            pt: `Roda apenas em <span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span>`,
            it: `Funziona solo su <span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span>`,
            ar: `يعمل فقط على <span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span>`,
            hi: `<span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span> पर ही चलता है`,
            pl: `Działa tylko na <span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span>`,
            nl: `Draait alleen op <span style="font-family: var(--font-mono); color: var(--nexus-green);">app.hyperliquid.xyz</span>`
        },
        footer_compliance_line2: {
            en: `No API or wallet permissions requested`,
            zh: `不会请求 API 或钱包权限`,
            fr: `Aucune permission API ou wallet requise`,
            ko: `API 또는 지갑 권한을 요청하지 않습니다`,
            es: `Sin solicitar permisos de API o wallet`,
            ja: `API やウォレット権限を要求しません`,
            tr: `API veya cüzdan izni istenmez`,
            vi: `Không yêu cầu quyền API hay ví`,
            ru: `Не запрашивает разрешений API или кошелька`,
            de: `Keine API- oder Wallet-Berechtigungen erforderlich`,
            pt: `Nenhuma permissão de API ou carteira solicitada`,
            it: `Nessuna autorizzazione API o wallet richiesta`,
            ar: `لا تُطلب أذونات API أو المحفظة`,
            hi: `API या वॉलेट अनुमतियाँ नहीं मांगी जातीं`,
            pl: `Nie wymaga uprawnień API ani portfela`,
            nl: `Geen API- of walletrechten vereist`
        },
        footer_status_title: {
            en: `Status`,
            zh: `状态`,
            fr: `Statut`,
            ko: `상태`,
            es: `Estado`,
            ja: `ステータス`,
            tr: `Durum`,
            vi: `Trạng thái`,
            ru: `Статус`,
            de: `Status`,
            pt: `Status`,
            it: `Stato`,
            ar: `الحالة`,
            hi: `स्थिति`,
            pl: `Status`,
            nl: `Status`
        },
        footer_status_line1: {
            en: `Systems Online · <span style="color: var(--nexus-green);">24/7</span>`,
            zh: `系统在线 · <span style="color: var(--nexus-green);">24/7</span>`,
            fr: `Systèmes en ligne · <span style="color: var(--nexus-green);">24/7</span>`,
            ko: `시스템 온라인 · <span style="color: var(--nexus-green);">24/7</span>`,
            es: `Sistemas en línea · <span style="color: var(--nexus-green);">24/7</span>`,
            ja: `システム稼働中 · <span style="color: var(--nexus-green);">24/7</span>`,
            tr: `Sistemler çevrimiçi · <span style="color: var(--nexus-green);">7/24</span>`,
            vi: `Hệ thống hoạt động · <span style="color: var(--nexus-green);">24/7</span>`,
            ru: `Системы онлайн · <span style="color: var(--nexus-green);">24/7</span>`,
            de: `Systeme online · <span style="color: var(--nexus-green);">24/7</span>`,
            pt: `Sistemas online · <span style="color: var(--nexus-green);">24/7</span>`,
            it: `Sistemi online · <span style="color: var(--nexus-green);">24/7</span>`,
            ar: `الأنظمة متصلة · <span style="color: var(--nexus-green);">24/7</span>`,
            hi: `सिस्टम ऑनलाइन · <span style="color: var(--nexus-green);">24/7</span>`,
            pl: `Systemy online · <span style="color: var(--nexus-green);">24/7</span>`,
            nl: `Systemen online · <span style="color: var(--nexus-green);">24/7</span>`
        },
        footer_status_line2: {
            en: `Version 1.4.2`,
            zh: `版本 1.4.2`,
            fr: `Version 1.4.2`,
            ko: `버전 1.4.2`,
            es: `Versión 1.4.2`,
            ja: `バージョン 1.4.2`,
            tr: `Sürüm 1.4.2`,
            vi: `Phiên bản 1.4.2`,
            ru: `Версия 1.4.2`,
            de: `Version 1.4.2`,
            pt: `Versão 1.4.2`,
            it: `Versione 1.4.2`,
            ar: `الإصدار 1.4.2`,
            hi: `संस्करण 1.4.2`,
            pl: `Wersja 1.4.2`,
            nl: `Versie 1.4.2`
        },
        footer_copy: {
            en: `Decentralized Local Execution Layer<br>Not financial advice. You are the controller<br>© 2025 NexusTools. All rights reserved`,
            zh: `去中心化本地执行层<br>非投资建议。你掌控一切<br>© 2025 NexusTools. 保留所有权利`,
            fr: `Couche d’exécution locale décentralisée<br>Ceci n’est pas un conseil financier. Vous gardez le contrôle<br>© 2025 NexusTools. Tous droits réservés`,
            ko: `탈중앙화 로컬 실행 레이어<br>투자 조언이 아닙니다. 통제권은 여러분에게 있습니다<br>© 2025 NexusTools. 모든 권리를 보유합니다`,
            es: `Capa de ejecución local descentralizada<br>No es asesoramiento financiero. Tú tienes el control<br>© 2025 NexusTools. Todos los derechos reservados`,
            ja: `分散型ローカル実行レイヤー<br>投資助言ではありません。あなたがコントロールします<br>© 2025 NexusTools. 全ての権利を保有します`,
            tr: `Merkeziyetsiz yerel yürütme katmanı<br>Finansal tavsiye değildir. Kontrol sizde<br>© 2025 NexusTools. Tüm hakları saklıdır`,
            vi: `Lớp thực thi cục bộ phi tập trung<br>Không phải tư vấn tài chính. Bạn tự kiểm soát<br>© 2025 NexusTools. Giữ toàn bộ bản quyền`,
            ru: `Децентрализованный локальный слой выполнения<br>Не является финансовым советом. Вы контроллер<br>© 2025 NexusTools. Все права защищены`,
            de: `Dezentralisierte lokale Ausführungsschicht<br>Keine Finanzberatung. Sie behalten die Kontrolle<br>© 2025 NexusTools. Alle Rechte vorbehalten`,
            pt: `Camada de Execução Local Descentralizada<br>Não é aconselhamento financeiro. Você está no controle<br>© 2025 NexusTools. Todos os direitos reservados`,
            it: `Strato di esecuzione locale decentralizzato<br>Non è consulenza finanziaria. Tu hai il controllo<br>© 2025 NexusTools. Tutti i diritti riservati`,
            ar: `طبقة تنفيذ محلية لامركزية<br>ليست نصيحة مالية. أنت المتحكم<br>© 2025 NexusTools. جميع الحقوق محفوظة`,
            hi: `विकेंद्रीकृत लोकल निष्पादन लेयर<br>यह वित्तीय सलाह नहीं है। नियंत्रण आपके पास है<br>© 2025 NexusTools. सर्वाधिकार सुरक्षित`,
            pl: `Zdecentralizowana lokalna warstwa wykonawcza<br>Nie stanowi porady finansowej. Kontrolę sprawujesz Ty<br>© 2025 NexusTools. Wszelkie prawa zastrzeżone`,
            nl: `Gedecentraliseerde lokale uitvoeringslaag<br>Geen financieel advies. Jij hebt de controle<br>© 2025 NexusTools. Alle rechten voorbehouden`
        },
        cookie_tag: {
            en: `Privacy Pulse`,
            zh: `隐私提示`,
            fr: `Pulse confidentialité`,
            ko: `프라이버시 펄스`,
            es: `Pulso de privacidad`,
            ja: `プライバシーパルス`,
            tr: `Gizlilik Nabzı`,
            vi: `Nhịp độ quyền riêng tư`,
            ru: `Пульс конфиденциальности`,
            de: `Datenschutz-Puls`,
            pt: `Pulso de privacidade`,
            it: `Impulse privacy`,
            ar: `نبض الخصوصية`,
            hi: `गोपनीयता पल्स`,
            pl: `Puls prywatności`,
            nl: `Privacy Pulse`
        },
        cookie_title: {
            en: `Cookie Control Center`,
            zh: `Cookie 控制中心`,
            fr: `Centre de contrôle des cookies`,
            ko: `쿠키 제어 센터`,
            es: `Centro de control de cookies`,
            ja: `Cookie コントロールセンター`,
            tr: `Çerez Kontrol Merkezi`,
            vi: `Trung tâm kiểm soát cookie`,
            ru: `Центр управления cookies`,
            de: `Cookie-Kontrollzentrum`,
            pt: `Centro de controle de cookies`,
            it: `Centro di controllo cookie`,
            ar: `مركز التحكم في ملفات تعريف الارتباط`,
            hi: `कुकी नियंत्रण केंद्र`,
            pl: `Centrum zarządzania plikami cookie`,
            nl: `Cookiebeheercentrum`
        },
        cookie_message: {
            en: `Choose how we remember your language preference. No tracking, no ads - just local UX.`,
            zh: `选择我们如何记住你的语言偏好。无跟踪、无广告，只为本地体验。`,
            fr: `Choisissez comment nous mémorisons votre langue. Aucun suivi, aucune pub : uniquement une UX locale.`,
            ko: `언어 설정을 어떻게 기억할지 선택하세요. 추적이나 광고 없이 순수 로컬 UX만 제공합니다.`,
            es: `Elige cómo recordamos tu idioma. Sin rastreo ni anuncios: solo experiencia local.`,
            ja: `言語設定をどのように記憶するかを選択してください。トラッキングも広告もなく、ローカル体験のためだけです。`,
            tr: `Dil tercihini nasıl hatırlayacağımızı seç. Takip yok, reklam yok - sadece yerel deneyim.`,
            vi: `Chọn cách chúng tôi ghi nhớ ngôn ngữ của bạn. Không theo dõi, không quảng cáo - chỉ trải nghiệm cục bộ.`,
            ru: `Выберите, как мы будем помнить ваши языковые предпочтения. Никакого трекинга, никакой рекламы — только локальный UX.`,
            de: `Wählen Sie, wie wir uns Ihre Sprachpräferenz merken. Kein Tracking, keine Werbung – nur lokale UX.`,
            pt: `Escolha como lembramos sua preferência de idioma. Sem rastreamento, sem anúncios - apenas UX local.`,
            it: `Scegli come ricordiamo la tua preferenza linguistica. Niente tracking, niente pubblicità: solo UX locale.`,
            ar: `اختر كيف نتذكر تفضيل لغتك. بلا تتبع، بلا إعلانات - مجرد تجربة محلية.`,
            hi: `चुनें कि हम आपकी भाषा वरीयता को कैसे याद रखें। कोई ट्रैकिंग नहीं, कोई विज्ञापन नहीं - सिर्फ स्थानीय अनुभव।`,
            pl: `Wybierz, jak mamy zapamiętać Twój język. Bez śledzenia, bez reklam – wyłącznie lokalny UX.`,
            nl: `Kies hoe we uw taalvoorkeur onthouden. Geen tracking, geen advertenties – alleen lokale UX.`
        },
        cookie_decline_title: {
            en: `Decline`,
            zh: `拒绝`,
            fr: `Refuser`,
            ko: `거부`,
            es: `Rechazar`,
            ja: `拒否`,
            tr: `Reddet`,
            vi: `Từ chối`,
            ru: `Отклонить`,
            de: `Ablehnen`,
            pt: `Recusar`,
            it: `Rifiuta`,
            ar: `رفض`,
            hi: `अस्वीकार करें`,
            pl: `Odrzuć`,
            nl: `Weigeren`
        },
        cookie_decline_desc: {
            en: `Skip cookies completely. We’ll ask again next visit.`,
            zh: `完全不使用 Cookie，下次访问时会再次询问。`,
            fr: `Pas de cookies du tout. Nous reposerons la question à chaque visite.`,
            ko: `쿠키를 전혀 사용하지 않습니다. 다음 방문 시 다시 물어볼게요.`,
            es: `Sin cookies en absoluto. Te preguntaremos de nuevo en cada visita.`,
            ja: `Cookie を一切使いません。次回以降も毎回確認します。`,
            tr: `Hiç çerez kullanılmaz. Bir sonraki ziyarette tekrar sorarız.`,
            vi: `Không dùng cookie nào. Chúng tôi sẽ hỏi lại mỗi lần ghé.`,
            ru: `Полностью пропустить cookies. Мы спросим снова при следующем визите.`,
            de: `Cookies vollständig überspringen. Wir fragen beim nächsten Besuch erneut.`,
            pt: `Pule os cookies completamente. Perguntaremos novamente na próxima visita.`,
            it: `Salta completamente i cookie. Chiederemo di nuovo alla prossima visita.`,
            ar: `تخطى ملفات تعريف الارتباط تمامًا. سنسأل مرة أخرى في الزيارة التالية.`,
            hi: `कुकीज़ पूरी तरह छोड़ दें। अगली बार आने पर हम फिर पूछेंगे।`,
            pl: `Pomiń całkowicie pliki cookie. Zapytamy ponownie przy następnej wizycie.`,
            nl: `Sla cookies helemaal over. We vragen het bij een volgend bezoek opnieuw.`
        },
        cookie_minimal_title: {
            en: `Minimal`,
            zh: `最简模式`,
            fr: `Minimal`,
            ko: `최소`,
            es: `Mínimo`,
            ja: `ミニマル`,
            tr: `Minimum`,
            vi: `Tối giản`,
            ru: `Минимально`,
            de: `Minimal`,
            pt: `Mínimo`,
            it: `Minimale`,
            ar: `الحد الأدنى`,
            hi: `न्यूनतम`,
            pl: `Minimalne`,
            nl: `Minimaal`
        },
        cookie_minimal_desc: {
            en: `Remember the language in this browser only (no cookies).`,
            zh: `仅在此浏览器中记住语言（不写入 Cookie）。`,
            fr: `Mémoriser la langue seulement dans ce navigateur (sans cookies).`,
            ko: `이 브라우저 안에서만 언어를 기억합니다 (쿠키 없음).`,
            es: `Recordamos el idioma solo en este navegador (sin cookies).`,
            ja: `このブラウザだけで言語を記憶します（Cookie なし）。`,
            tr: `Dili sadece bu tarayıcıda tutarız (çerez yok).`,
            vi: `Chỉ nhớ ngôn ngữ trong trình duyệt này (không cookie).`,
            ru: `Запомнить язык только в этом браузере (без cookies).`,
            de: `Sprache nur in diesem Browser merken (keine Cookies).`,
            pt: `Memorizar o idioma apenas neste navegador (sem cookies).`,
            it: `Ricorda la lingua solo in questo browser (nessun cookie).`,
            ar: `تذكر اللغة في هذا المتصفح فقط (بدون ملفات تعريف الارتباط).`,
            hi: `भाषा केवल इस ब्राउज़र में याद रखें (कोई कुकी नहीं)।`,
            pl: `Zapamiętaj język tylko w tej przeglądarce (bez plików cookie).`,
            nl: `Onthoud de taal alleen in deze browser (geen cookies).`
        },
        cookie_accept_title: {
            en: `Full Memory`,
            zh: `完整记忆`,
            fr: `Mémoire totale`,
            ko: `완전 기억`,
            es: `Memoria total`,
            ja: `フルメモリー`,
            tr: `Tam hafıza`,
            vi: `Ghi nhớ đầy đủ`,
            ru: `Полная память`,
            de: `Voller Speicher`,
            pt: `Memória completa`,
            it: `Memoria completa`,
            ar: `ذاكرة كاملة`,
            hi: `पूर्ण स्मृति`,
            pl: `Pełna pamięć`,
            nl: `Volledig geheugen`
        },
        cookie_accept_desc: {
            en: `Sync your language across sessions for seamless launches.`,
            zh: `在多次会话间同步语言，体验更顺滑。`,
            fr: `Synchroniser la langue entre les sessions pour un lancement fluide.`,
            ko: `세션 간 언어를 동기화해 더 매끄럽게 시작합니다.`,
            es: `Sincroniza el idioma entre sesiones para un inicio fluido.`,
            ja: `セッション間で言語を同期し、スムーズに起動します。`,
            tr: `Dili oturumlar arasında senkronlayarak açılışı pürüzsüz hale getirir.`,
            vi: `Đồng bộ ngôn ngữ giữa các phiên để khởi chạy mượt mà.`,
            ru: `Синхронизируйте язык между сессиями для плавных запусков.`,
            de: `Synchronisieren Sie Ihre Sprache zwischen Sitzungen für nahtlose Starts.`,
            pt: `Sincronize seu idioma entre sessões para inícios contínuos.`,
            it: `Sincronizza la lingua tra le sessioni per avvii senza attriti.`,
            ar: `زامن لغتك عبر الجلسات لإطلاقات سلسة.`,
            hi: `सत्रों के बीच अपनी भाषा सिंक करें ताकि लॉन्च निर्बाध हों।`,
            pl: `Synchronizuj język między sesjami, aby uruchomienia były płynne.`,
            nl: `Synchroniseer uw taal tussen sessies voor soepele launches.`
        },
        cookie_minimal: {
            en: `Minimal cookies`,
            zh: `最少 Cookie`,
            fr: `Cookies minimaux`,
            ko: `최소한의 쿠키`,
            es: `Cookies mínimos`,
            ja: `最小限のクッキー`,
            tr: `Minimum çerez`,
            vi: `Chỉ cookie cần thiết`,
            ru: `Минимум cookies`,
            de: `Minimale Cookies`,
            pt: `Cookies mínimos`,
            it: `Cookie minimi`,
            ar: `ملفات تعريف الارتباط الدنيا`,
            hi: `न्यूनतम कुकीज़`,
            pl: `Minimalne cookies`,
            nl: `Minimale cookies`
        },
        cookie_decline: {
            en: `Decline`,
            zh: `拒绝`,
            fr: `Refuser`,
            ko: `거부`,
            es: `Rechazar`,
            ja: `拒否`,
            tr: `Reddet`,
            vi: `Từ chối`,
            ru: `Отклонить`,
            de: `Ablehnen`,
            pt: `Recusar`,
            it: `Rifiuta`,
            ar: `رفض`,
            hi: `अस्वीकार करें`,
            pl: `Odrzuć`,
            nl: `Weigeren`
        }
    };
    const LANGUAGE_COOKIE_KEY = 'nexus-language';
    const CONSENT_COOKIE_KEY = 'nexus-cookie-consent';
    const COOKIE_MAX_AGE_DAYS = 365;
    const supportedLanguages = ['en', 'zh', 'fr', 'ko', 'es', 'ja', 'tr', 'vi', 'ru', 'de', 'pt', 'it', 'ar', 'hi', 'pl', 'nl'];
    const languageSelect = document.getElementById('languageSelect');
    const i18nElements = document.querySelectorAll('[data-i18n]');
    const cookieToast = document.getElementById('cookieToast');
    const cookieAcceptButton = document.getElementById('cookieAccept');
    const cookieMinimalButton = document.getElementById('cookieMinimal');
    const cookieDeclineButton = document.getElementById('cookieDecline');
    const getCurrentLanguage = () => languageSelect?.value || document.documentElement.lang || 'en';

    const readStorage = (key) => {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            return null;
        }
    };

    const writeStorage = (key, value) => {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            // Ignore storage failures (private mode / disabled)
        }
    };

    const removeStorage = (key) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            // Ignore storage failures
        }
    };

    let consentState = null;

    const setCookie = (name, value, days = COOKIE_MAX_AGE_DAYS) => {
        if (typeof document === 'undefined') {
            return;
        }
        const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
    };

    const getCookie = (name) => {
        if (typeof document === 'undefined') {
            return null;
        }
        const cookies = document.cookie ? document.cookie.split('; ') : [];
        const match = cookies.find((entry) => entry.startsWith(`${name}=`));
        return match ? decodeURIComponent(match.split('=')[1]) : null;
    };

    const deleteCookie = (name) => {
        if (typeof document === 'undefined') {
            return;
        }
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
    };

    const persistLanguagePreference = (lang) => {
        if (!consentState || consentState === 'declined') {
            return;
        }
        if (consentState === 'accepted') {
            setCookie(LANGUAGE_COOKIE_KEY, lang);
        } else {
            deleteCookie(LANGUAGE_COOKIE_KEY);
        }
        writeStorage(LANGUAGE_COOKIE_KEY, lang);
    };

    const getTranslation = (lang, key) => translations[key]?.[lang] ?? translations[key]?.en ?? '';

    const applyTranslations = (lang) => {
        i18nElements.forEach((element) => {
            const key = element.getAttribute('data-i18n');
            const value = getTranslation(lang, key);
            if (value) {
                element.innerHTML = value;
            }
        });
        document.documentElement.lang = lang;
        persistLanguagePreference(lang);
    };

    const detectInitialLanguage = () => {
        const storedCookieLang = getCookie(LANGUAGE_COOKIE_KEY);
        if (storedCookieLang && supportedLanguages.includes(storedCookieLang)) {
            return storedCookieLang;
        }

        const stored = readStorage(LANGUAGE_COOKIE_KEY);
        if (stored && supportedLanguages.includes(stored)) {
            return stored;
        }

        const browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
        if (supportedLanguages.includes(browser)) {
            return browser;
        }
        return 'en';
    };
    const toggleCookieToast = (visible) => {
        if (!cookieToast) {
            return;
        }
        if (visible) {
            cookieToast.classList.add('visible');
            cookieToast.classList.remove('dismissed');
            cookieToast.removeAttribute('aria-hidden');
        } else {
            cookieToast.classList.remove('visible');
            cookieToast.classList.add('dismissed');
            cookieToast.setAttribute('aria-hidden', 'true');
        }
    };

    const storeConsentState = (state) => {
        consentState = state;
        if (state === 'accepted') {
            setCookie(CONSENT_COOKIE_KEY, state);
        } else {
            deleteCookie(CONSENT_COOKIE_KEY);
        }
        writeStorage(CONSENT_COOKIE_KEY, state);

        if (state === 'declined') {
            deleteCookie(LANGUAGE_COOKIE_KEY);
            removeStorage(LANGUAGE_COOKIE_KEY);
        } else if (state === 'minimal') {
            deleteCookie(LANGUAGE_COOKIE_KEY);
        } else if (state === 'accepted') {
            const storedLanguage = readStorage(LANGUAGE_COOKIE_KEY);
            if (storedLanguage) {
                setCookie(LANGUAGE_COOKIE_KEY, storedLanguage);
            }
        }
    };

    const initConsentState = () => {
        const storedState = getCookie(CONSENT_COOKIE_KEY) || readStorage(CONSENT_COOKIE_KEY);
        if (storedState) {
            storeConsentState(storedState);
        }
    };

    const initCookieToast = () => {
        if (!cookieToast) {
            return;
        }

        toggleCookieToast(false);

        if (cookieAcceptButton) {
            cookieAcceptButton.addEventListener('click', () => {
                storeConsentState('accepted');
                persistLanguagePreference(getCurrentLanguage());
                toggleCookieToast(false);
                cookieAcceptButton.blur();
            });
        }

        if (cookieMinimalButton) {
            cookieMinimalButton.addEventListener('click', () => {
                storeConsentState('minimal');
                persistLanguagePreference(getCurrentLanguage());
                toggleCookieToast(false);
                cookieMinimalButton.blur();
            });
        }

        if (cookieDeclineButton) {
            cookieDeclineButton.addEventListener('click', () => {
                storeConsentState('declined');
                toggleCookieToast(false);
                cookieDeclineButton.blur();
            });
        }

        if (!consentState) {
            setTimeout(() => toggleCookieToast(true), 1000);
        } else {
            toggleCookieToast(false);
        }
    };

    initConsentState();

    const activeLanguage = detectInitialLanguage();
    if (languageSelect) {
        languageSelect.value = activeLanguage;
        languageSelect.addEventListener('change', (event) => {
            const nextLanguage = event.target.value;
            const resolved = supportedLanguages.includes(nextLanguage) ? nextLanguage : 'en';
            applyTranslations(resolved);
        });
    }
    applyTranslations(activeLanguage);
    initCookieToast();

    const navLinkMap = new Map(
        navLinks
            .map((link) => {
                const href = link.getAttribute('href') || '';
                return href.startsWith('#') ? [href.substring(1), link] : null;
            })
            .filter(Boolean)
    );
    let noticeCursorActive = false;
    let noticeCheckScheduled = false;

    const easeInOutCubic = (t) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const smoothScrollTo = (targetPosition, duration = 1000) => {
        if (prefersReducedMotion.matches) {
            window.scrollTo({ top: targetPosition, behavior: 'auto' });
            return;
        }

            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const startTime = performance.now();
             
        const animation = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const ease = easeInOutCubic(progress);
                
                window.scrollTo(0, startPosition + distance * ease);

                if (progress < 1) {
                    requestAnimationFrame(animation);
             }
        };

            requestAnimationFrame(animation);
    };

    let currentActiveLink = null;
    const setActiveLink = (link) => {
        if (link === currentActiveLink) {
            return;
        }

        if (currentActiveLink) {
            currentActiveLink.classList.remove('active');
            currentActiveLink.style.textShadow = '';
        }

        if (link) {
            link.classList.add('active');
            link.style.textShadow = '0 0 10px rgba(183, 148, 246, 0.5)';
        }

        currentActiveLink = link;
    };

    const updateActiveSection = (scrollY) => {
        let nextActive = null;

        sectionsWithId.forEach((section) => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 200;
                const sectionBottom = sectionTop + sectionHeight;
            const navLink = navLinkMap.get(section.id);
                
                if (scrollY + window.innerHeight > sectionTop + 100) {
                    section.classList.add('visible');
            }

            if (!nextActive && navLink && scrollY >= sectionTop && scrollY < sectionBottom) {
                nextActive = navLink;
            }
        });

        setActiveLink(nextActive);

        if (navbar) {
            const isScrolled = scrollY > 50;
            navbar.style.background = isScrolled ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0.8)';
                navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.5)' : '';
            navbar.classList.toggle('scrolled', isScrolled);
        }
    };

    const updateParallax = (scrollY) => {
        if (heroGradient) {
            heroGradient.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
    };

    const handleScrollFrame = () => {
        const scrollY = window.scrollY;
        updateActiveSection(scrollY);
        updateParallax(scrollY);
        isTicking = false;
    };

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetId = anchor.getAttribute('href') || '';
            if (targetId.length <= 1) {
                return;
            }

            const target = document.querySelector(targetId);
            if (!target) {
                return;
            }

            event.preventDefault();

            if (getComputedStyle(anchor).position === 'static') {
                anchor.style.position = 'relative';
            }

            const ripple = document.createElement('span');
            ripple.className = 'nav-ripple';
            anchor.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);

            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            smoothScrollTo(targetPosition, 800);

            if (anchor.classList.contains('nav-link')) {
                setActiveLink(anchor);
            }
        });
    });

    let isTicking = false;
    let scrollTimeout;

    window.addEventListener('scroll', () => {
        if (!isTicking) {
            window.requestAnimationFrame(handleScrollFrame);
            isTicking = true;
        }

        clearTimeout(scrollTimeout);
        body.classList.add('scrolling');
        scrollTimeout = setTimeout(() => body.classList.remove('scrolling'), 150);
    });

        window.addEventListener('load', () => {
        handleScrollFrame();
        if (heroSection) {
            setTimeout(() => heroSection.classList.add('visible'), 100);
        }
    });

        const terminalLines = document.querySelectorAll('.terminal-line');
    const terminalObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                }
            });
        },
        { threshold: 0.1 }
    );

    terminalLines.forEach((line) => terminalObserver.observe(line));
        
        const canvas = document.getElementById('miniChart');
        if (canvas) {
         const ctx = canvas.getContext('2d');
            let chartData = [];
         
        const resizeCanvas = () => {
                const rect = canvas.getBoundingClientRect();
            const pixelRatio = window.devicePixelRatio || 1;
            canvas.width = rect.width * pixelRatio;
            canvas.height = rect.height * pixelRatio;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(pixelRatio, pixelRatio);
        };
            
         resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            
        const generateData = () => {
                chartData = [];
                let value = 100;
                for (let i = 0; i < 50; i++) {
                    value += (Math.random() - 0.45) * 2;
                    chartData.push(value);
         }
        };

        const drawChart = () => {
            const width = canvas.width / (window.devicePixelRatio || 1);
            const height = canvas.height / (window.devicePixelRatio || 1);
                
                ctx.clearRect(0, 0, width, height);
             
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
             ctx.lineWidth = 1;
                for (let i = 0; i < 5; i++) {
             ctx.beginPath();
                    ctx.moveTo(0, (height / 5) * i);
                    ctx.lineTo(width, (height / 5) * i);
             ctx.stroke();
                }

            if (!chartData.length) {
                return;
            }

                    const stepX = width / (chartData.length - 1);
                    const maxValue = Math.max(...chartData);
                    const minValue = Math.min(...chartData);
            const range = maxValue - minValue || 1;

             ctx.beginPath();
                    ctx.moveTo(0, height);
                    chartData.forEach((value, index) => {
                        const x = index * stepX;
                        const y = height - ((value - minValue) / range) * height * 0.8 - height * 0.1;
                            ctx.lineTo(x, y);
                    });
                    ctx.lineTo(width, height);
                    ctx.closePath();
                    
                    const gradient = ctx.createLinearGradient(0, 0, 0, height);
             gradient.addColorStop(0, 'rgba(183, 148, 246, 0.3)');
             gradient.addColorStop(1, 'rgba(183, 148, 246, 0)');
                    ctx.fillStyle = gradient;
                    ctx.fill();
                    
                    ctx.beginPath();
                    chartData.forEach((value, index) => {
                        const x = index * stepX;
                        const y = height - ((value - minValue) / range) * height * 0.8 - height * 0.1;
                        if (index === 0) {
                     ctx.moveTo(x, y);
                 } else {
                            ctx.lineTo(x, y);
                        }
                    });
                    
                    ctx.strokeStyle = '#b794f6';
                    ctx.lineWidth = 2;
                    ctx.shadowColor = '#b794f6';
                    ctx.shadowBlur = 10;
             ctx.stroke();
             ctx.shadowBlur = 0;
        };
            
        const animateChart = () => {
                if (chartData.length > 50) {
                    chartData.shift();
                }
                const lastValue = chartData[chartData.length - 1] || 100;
                chartData.push(lastValue + (Math.random() - 0.45) * 2);
                
                drawChart();
             
                const pnl = (Math.random() * 10 + 1).toFixed(1);
                const usd = (Math.random() * 3000 + 500).toFixed(2);
                
                const pnlElement = document.getElementById('terminal-pnl');
                const usdElement = document.getElementById('terminal-usd');
                const profitElement = document.getElementById('mini-profit');
                
                if (pnlElement) pnlElement.textContent = `+${pnl}%`;
                if (usdElement) usdElement.textContent = `$${usd}`;
                if (profitElement) profitElement.textContent = `+$${usd}`;
        };

            generateData();
            drawChart();
            setInterval(animateChart, 500);
        }

        const cursorEl = document.querySelector('.cursor');
        const followerEl = document.querySelector('.cursor-follower');
    const textMatchesSignature = (text = '') =>
        noticeSignatures.some((signature) => text.includes(signature));

    const isNoticeVisible = () => {
        for (const selector of noticeSelectors) {
            const candidate = document.querySelector(selector);
            if (candidate && textMatchesSignature(candidate.textContent || '')) {
                return true;
            }
        }
        return textMatchesSignature(document.body.textContent || '');
    };

    const setNativeCursorState = (enabled) => {
        if (!prefersHover) return;
        noticeCursorActive = enabled;
        body.classList.toggle('cursor-native', enabled);
    };

    const scheduleNoticeCheck = () => {
        if (!prefersHover || noticeCheckScheduled) return;
        noticeCheckScheduled = true;
        requestAnimationFrame(() => {
            noticeCheckScheduled = false;
            const shouldEnable = isNoticeVisible();
            if (shouldEnable !== noticeCursorActive) {
                setNativeCursorState(shouldEnable);
            }
        });
    };

    if (prefersHover) {
        const noticeObserver = new MutationObserver(() => {
            scheduleNoticeCheck();
        });
        noticeObserver.observe(document.body, { childList: true, subtree: true });

        bookmarkletButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                setNativeCursorState(true);
                scheduleNoticeCheck();
                setTimeout(scheduleNoticeCheck, 250);
                setTimeout(scheduleNoticeCheck, 1200);
            });
        });

        window.addEventListener('focus', scheduleNoticeCheck);
    }

    scheduleNoticeCheck();

        if (cursorEl && followerEl && prefersHover) {
            let mouseX = window.innerWidth / 2;
            let mouseY = window.innerHeight / 2;
            let followerX = mouseX;
            let followerY = mouseY;
            let cursorScale = 1;

            const updateCursor = () => {
                cursorEl.style.transform = `translate3d(${mouseX - 6}px, ${mouseY - 6}px, 0) scale(${cursorScale})`;
            };

            const renderFollower = () => {
                followerX += (mouseX - followerX) * 0.12;
                followerY += (mouseY - followerY) * 0.12;
                followerEl.style.transform = `translate3d(${followerX - 15}px, ${followerY - 15}px, 0) scale(${cursorScale === 1 ? 1 : 0.9})`;
                requestAnimationFrame(renderFollower);
            };

            renderFollower();
            updateCursor();

            window.addEventListener('pointermove', (event) => {
                mouseX = event.clientX;
                mouseY = event.clientY;
                updateCursor();
            });

            window.addEventListener('pointerdown', () => {
                cursorScale = 0.7;
                updateCursor();
            });

            window.addEventListener('pointerup', () => {
                cursorScale = 1;
                updateCursor();
            });
        }

    if (prefersHover) {
            const tiltTargets = document.querySelectorAll('[data-tilt]');
            tiltTargets.forEach((card) => {
                if (card.classList.contains('feature-card')) {
                    const glitch = document.createElement('div');
                    glitch.className = 'card-glitch';
                    card.appendChild(glitch);
                }

                card.addEventListener('pointermove', (event) => {
                    const bounds = card.getBoundingClientRect();
                    const x = event.clientX - bounds.left;
                    const y = event.clientY - bounds.top;
                    const xPct = (x / bounds.width) * 100;
                    const yPct = (y / bounds.height) * 100;
                    card.style.setProperty('--x', `${xPct}%`);
                    card.style.setProperty('--y', `${yPct}%`);

                    const rotateY = ((x / bounds.width) - 0.5) * 12;
                    const rotateX = ((y / bounds.height) - 0.5) * -12;
                    card.style.setProperty('--tiltY', `${rotateY}deg`);
                    card.style.setProperty('--tiltX', `${rotateX}deg`);
                    card.classList.add('is-tilting');
                });

                card.addEventListener('pointerleave', () => {
                    card.style.setProperty('--tiltY', '0deg');
                    card.style.setProperty('--tiltX', '0deg');
                    card.classList.remove('is-tilting');
                });
            });
        }

        const magneticButtons = document.querySelectorAll('.btn, .nav-cta, .nav-link');
    magneticButtons.forEach((btn) => {
        btn.addEventListener('mousemove', (event) => {
                const rect = btn.getBoundingClientRect();
            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0px, 0px)';
            });
        });

        const heroCanvas = document.getElementById('hero-canvas');
        if (heroCanvas) {
            const ctx = heroCanvas.getContext('2d');
        let width;
        let height;
            let columns;
            const fontSize = 14;
            const drops = [];
        const chars = '0123456789ABCDEF';

        const initCanvas = () => {
                width = heroCanvas.width = window.innerWidth;
                height = heroCanvas.height = window.innerHeight;
                columns = Math.floor(width / fontSize);
                
                for (let i = 0; i < columns; i++) {
                drops[i] = Math.random() * -100;
            }
        };

        const draw = () => {
            ctx.fillStyle = 'rgba(2, 2, 2, 0.1)';
                ctx.fillRect(0, 0, width, height);

                ctx.font = `${fontSize}px 'JetBrains Mono'`;

                for (let i = 0; i < drops.length; i++) {
                    const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillStyle = Math.random() > 0.98 ? '#fff' : '#b794f6';
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                    if (drops[i] * fontSize > height && Math.random() > 0.975) {
                        drops[i] = 0;
                    }
                    drops[i]++;
                }

                requestAnimationFrame(draw);
        };

            window.addEventListener('resize', initCanvas);
            initCanvas();
            draw();
        }

    animatedElements.forEach((element) => {
        if (!element.classList.contains('scroll-animate')) {
            element.classList.add('scroll-animate');
        }
    });

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

    const elementObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            root: null,
            rootMargin: '0px 0px -10%',
            threshold: 0.2
        }
    );

    allSections.forEach((section) => sectionObserver.observe(section));
    animatedElements.forEach((element) => elementObserver.observe(element));

        });
