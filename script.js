const { useState, useEffect, useRef, useCallback } = React;
const h = React.createElement;

/* ============================================================
   DATA
   ============================================================ */

const NAV_LINKS = [
    { href: '#main', label: 'Home', num: '00' },
    { href: '#about', label: 'About', num: '01' },
    { href: '#skills', label: 'Skills', num: '02' },
    { href: '#projects', label: 'Projects', num: '03' },
    { href: '#contact', label: 'Contact', num: '04' },
];

const ROLES = ['Professional', 'Curious', 'Technical'];

const SKILL_GROUPS = [
    {
        title: 'Coding',
        items: [
            { name: 'HTML', img: 'https://www.svgrepo.com/show/17134/html-file-with-code-symbol.svg', bgColor: '#E34F26' },
            { name: 'CSS', img: 'https://www.svgrepo.com/show/170099/css-file-format-symbol.svg', bgColor: '#1572B6' },
            { name: 'JavaScript', img: 'https://www.svgrepo.com/show/512400/javascript-155.svg', bgColor: '#F7DF1E' },
            { name: 'Java', img: 'https://www.svgrepo.com/show/30521/java.svg', bgColor: '#007396' },
            { name: 'Python', img: 'https://www.svgrepo.com/show/368903/python.svg', bgColor: '#3776AB' },
            { name: 'MySQL', img: 'https://www.svgrepo.com/show/342053/mysql.svg', bgColor: '#4479A1' },
        ],
    },
    {
        title: 'Tools',
        items: [
            { name: 'Docker', img: 'https://www.svgrepo.com/show/448401/docker.svg', bgColor: '#2496ED' },
            {
                name: 'Wireshark',
                bgColor: '#1679A7',
                svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Wireshark</title><path d="M13.2 2c-3.4 3.6-4.8 7.6-4.1 12 -2.3.3-4.5 1.2-6.3 2.7a.5.5 0 00.3.9c2.5-.2 5-.1 7.3.7a.5.5 0 00.7-.6c-.1-.8 0-1.6.2-2.3 1.6 1.6 3.6 2.7 5.9 3a.5.5 0 00.6-.8c-1-1.8-1.6-3.9-1.5-6 .1-3.5-.8-6.7-3.1-9.6z"/><path d="M2.2 19.4c2.6-.9 5.4-.9 8 0a.6.6 0 11-.4 1.1c-2.4-.8-4.9-.8-7.3 0a.6.6 0 11-.3-1.1z"/><path d="M12.6 20.3c2.1-.6 4.4-.5 6.5.2a.6.6 0 11-.4 1.1c-1.9-.6-4-.7-5.8-.2a.6.6 0 11-.3-1.1z"/></svg>',
            },
            {
                name: 'Metasploit',
                bgColor: '#2A6496',
                svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Metasploit</title><path d="M11.353 0h1.368q4.19 0.218 8.144 1.616 0.217 0.077 0.216 0.309 -0.015 4.033 -0.002 12.102 0 0.81 -0.093 1.173c-0.217 0.845 -0.76 1.635 -1.326 2.325q-0.318 0.388 -1.024 1.046 -2.955 2.75 -6.01 5.094 -0.183 0.14 -0.516 0.335h-0.17q-0.627 -0.42 -0.945 -0.673 -3.992 -3.184 -5.442 -4.459 -1.348 -1.185 -2.169 -2.611c-0.369 -0.64 -0.466 -1.287 -0.465 -2.099q0.01 -6.048 0.002 -12.218c0 -0.183 0.09 -0.264 0.261 -0.325Q7.145 0.227 11.352 0ZM7.474 7.864q0 -0.094 0.069 -0.031l2.797 2.516a0.374 0.372 21.2 0 1 0.122 0.276l-0.006 4.333a0.182 0.182 0 0 0 0.183 0.184l2.524 -0.018a0.11 0.11 89.8 0 0 0.108 -0.11q-0.007 -2.201 0.01 -4.461 0.002 -0.173 0.146 -0.29 1.397 -1.145 2.946 -2.393 0.068 -0.055 0.068 0.032v10.881q0 0.092 0.063 0.024 0.794 -0.865 1.628 -1.838 0.71 -0.83 0.984 -1.87 0.26 -0.989 0.262 -1.997 0.007 -4.754 0.009 -9.768a0.136 0.136 0 0 0 -0.137 -0.136q-1.15 0.004 -2.424 0c-0.287 -0.002 -0.441 -0.022 -0.619 0.149Q14.16 5.317 11.982 7.4a0.046 0.046 0 0 1 -0.062 0Q9.782 5.437 7.769 3.525c-0.234 -0.222 -0.515 -0.381 -0.843 -0.373q-1.09 0.026 -2.33 0.005 -0.184 -0.004 -0.184 0.18 -0.003 4.54 0.005 9.032 0.002 0.536 0.036 1.027c0.076 1.093 0.2 2.126 0.803 3.021 0.574 0.852 1.329 1.656 2.126 2.405q0.023 0.022 0.054 0.026 0.04 0.006 0.04 -0.034z"/></svg>',
            },
            {
                name: 'Burp Suite',
                bgColor: '#FF6600',
                svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M 8 4 C 5.800781 4 4 5.800781 4 8 L 4 42 C 4 44.199219 5.800781 46 8 46 L 42 46 C 44.199219 46 46 44.199219 46 42 L 46 8 C 46 5.800781 44.199219 4 42 4 Z M 8 6 L 24 6 L 24 9.585938 L 12.585938 21 L 24 21 L 24 30 L 32.585938 30 L 24 38.585938 L 24 44 L 8 44 C 6.882813 44 6 43.117188 6 42 L 6 8 C 6 6.882813 6.882813 6 8 6 Z M 26 6 L 42 6 C 43.117188 6 44 6.882813 44 8 L 44 42 C 44 43.117188 43.117188 44 42 44 L 26 44 L 26 39.414063 L 37.414063 28 L 26 28 L 26 19 L 17.414063 L 19 L 26 10.414063 Z"/></svg>',
            },
            { name: 'Kali Linux', img: 'https://www.svgrepo.com/show/330767/kalilinux.svg', bgColor: '#557C93' },
            { name: 'OWASP ZAP', img: 'images/png-clipart-owasp-zap-vulnerability-penetration-test-proxy-server-web-application-miscellaneous-angle.png', bgColor: '#005EA6' },
        ],
    },
    {
        title: 'Certifications',
        items: [
            {
                name: 'Security+',
                img: 'images/securityplus-logo-black.png',
                href: 'files/CompTIA%20Security+%20ce%20certificate.pdf',
                isCert: true,
                verifyText: 'VERIFY CERTIFICATE ↗',
                bgColor: '#C0121A'
            },
        ],
    },
];

const PROJECTS = [
    {
        title: 'shadowGen',
        img: 'images/shadowGen.jfif',
        href: 'https://github.com/ethan-snyder/shadowGen',
        description: 'A Python-based utility for generating Linux /etc/shadow format password hashes for educational purposes and authorized security training.',
    },
    {
        title: 'Caishen 财神',
        img: 'images/mySite.png',
        href: 'https://github.com/ethan-snyder/portfolio',
        description: 'This portfolio website was a great way to practice web development while implementing a sleek user interface.',
    },
    {
        title: 'Web Storefront Team Project',
        img: 'images/groubPJ.png',
        href: 'https://github.com/JMS1717/IST256-Group4',
        description: 'A group project for an Introduction to Web Development course, built with HTML, CSS, JavaScript, and C#.',
    },
];

const EXPERIENCE = [
    {
        title: 'Technology Development Program Associate',
        company: 'PNC',
        type: 'Full-time',
        dates: 'Feb 2026 \u2014 Present',
        duration: '6 months',
        location: 'Pittsburgh, PA \u00B7 On-site',
        bullets: [
            'Digital Workplace: Designed custom agents, encouraged agentic AI adoption through internal Viva Engage'
        ],
    },
    {
        title: 'Information Technology Summer Intern',
        company: 'PNC',
        type: 'Internship',
        dates: 'May 2025 \u2014 Aug 2025',
        duration: '4 months',
        location: 'Pittsburgh, PA \u00B7 Hybrid',
        bullets: [
            'Created & deployed into production a custom Python module for error logging of Slurm jobs',
            'Scaled custom Python module to 20+ Python scripts to store process metadata on 100+ Slurm jobs daily',
            'Utilized SQL queries to analyze enterprise-level fraud trends; gained experience with HDFS, Hive, Impala, Spark, & more',
        ],
    },
    {
        title: 'Cybersecurity Shadow Participant',
        company: 'American Eagle Outfitters Inc.',
        type: 'Internship',
        dates: 'Jun 2024 \u2014 Aug 2024',
        duration: '3 months',
        location: 'Pittsburgh, PA \u00B7 On-site',
        bullets: [
            'Gained insight into industry standard forensic tools such as Autopsy, Wireshark, & more',
            'Developed a foundational understanding of how real-world issues are analyzed and addressed',
        ],
    },
];

const CONTACT_CARDS = [
    { icon: 'fas fa-map-marker-alt', title: 'Location', value: 'Pittsburgh, PA' },
    { icon: 'fas fa-envelope', title: 'Email Address', value: 'ethansnyder445@gmail.com', copyable: true },
    { icon: 'fab fa-linkedin-in', title: 'LinkedIn', value: 'linkedin.com/in/ethan-snyder-a855b124a', href: 'https://www.linkedin.com/in/ethan-snyder-a855b124a/' },
];

const HOBBIES = [
    { icon: 'fa-solid fa-utensils', label: 'Cooking', fact: 'My favorite type of cuisne to cook is Sichuan.' },
    { icon: 'fa-solid fa-mountain', label: 'Hiking', fact: 'The hardest hike I ever did was Mt. Le Conte trail in the Smoky Mountains.' },
    { icon: 'fa-solid fa-book-open', label: 'Reading', fact: 'I love to read fantasy & history. My favorite series is Red Rising.' },
    { icon: 'fa-solid fa-user-secret', label: 'Offensive Security', fact: 'I enjoy going through HTB and Burp Suite Academy.' },
];

const TRAVEL_PLACES = [
    { name: 'United States', colors: ['#B22234', '#FFFFFF', '#3C3B6E'] },
    { name: 'Canada', colors: ['#FF0000', '#FFFFFF'] },
    { name: 'Mexico', colors: ['#006341', '#FFFFFF', '#CE1126'] },
    { name: 'Germany', colors: ['#000000', '#DD0000', '#FFCE00'] },
    { name: 'Netherlands', colors: ['#AE1C28', '#FFFFFF', '#21468B'] },
    { name: 'Cayman Islands', colors: ['#00247D', '#FFFFFF', '#CF142B'] },
    { name: 'Japan', colors: ['#FFFFFF', '#BC002D'] },
    { name: 'South Korea', colors: ['#FFFFFF', '#CD2E3A', '#0047A0'] },
    { name: 'China', colors: ['#DE2910', '#FFDE00'] },
    { name: 'Hong Kong', colors: ['#DE2910', '#FFFFFF'] },
    { name: 'Macao', colors: ['#00785E', '#FFFFFF', '#FFFF00'] },
    { name: 'Taiwan', colors: ['#000095', '#FE0000', '#FFFFFF'] },
    { name: 'Thailand', colors: ['#A51931', '#F4F5F8', '#2D2A4A'] },
];

/* ============================================================
   HOOKS & UTILS
   ============================================================ */

function useReveal() {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    return ref;
}

function useTilt(maxTilt = 10) {
    const ref = useRef(null);
    const [style, setStyle] = useState({});
    const [tilting, setTilting] = useState(false);

    const onMouseMove = useCallback((e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rotateY = (px - 0.5) * maxTilt * 2;
        const rotateX = (0.5 - py) * maxTilt * 2;

        setStyle({
            transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`,
            '--gx': `${px * 100}%`,
            '--gy': `${py * 100}%`,
        });
    }, [maxTilt]);

    const onMouseEnter = useCallback(() => setTilting(true), []);

    const onMouseLeave = useCallback(() => {
        setTilting(false);
        setStyle({
            transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
        });
    }, []);

    return { ref, style, tilting, onMouseMove, onMouseEnter, onMouseLeave };
}

/* ============================================================
   ARTISTIC CYBER BACKGROUND CANVAS (NEW REACT ELEMENT)
   ============================================================ */
function CyberCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Nodes for tech graph visualization
        const nodeCount = 35;
        const nodes = Array.from({ length: nodeCount }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            size: Math.random() * 2 + 1,
        }));

        // Binary digital rain drops
        const chars = '01100101011010011000101110101';
        const columns = Math.floor(canvas.width / 24);
        const drops = Array.from({ length: columns }, () => Math.random() * -100);

        let angle = 0;

        const render = () => {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.22)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 1. Digital Matrix Rain (subtle cybersecurity accent)
            ctx.fillStyle = 'rgba(255, 192, 3, 0.12)';
            ctx.font = '11px "JetBrains Mono", monospace';
            for (let i = 0; i < drops.length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(char, i * 24, drops[i]);
                if (drops[i] > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i] += 12;
            }

            // 2. Animated Cybersecurity Grid Nodes & Connections
            ctx.lineWidth = 0.8;
            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i];
                n.x += n.vx;
                n.y += n.vy;

                if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
                if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

                ctx.fillStyle = 'rgba(255, 192, 3, 0.5)';
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
                ctx.fill();

                for (let j = i + 1; j < nodes.length; j++) {
                    const n2 = nodes[j];
                    const dist = Math.hypot(n.x - n2.x, n.y - n2.y);
                    if (dist < 140) {
                        ctx.strokeStyle = `rgba(255, 192, 3, ${0.15 * (1 - dist / 140)})`;
                        ctx.beginPath();
                        ctx.moveTo(n.x, n.y);
                        ctx.lineTo(n2.x, n2.y);
                        ctx.stroke();
                    }
                }
            }

            // 3. Cyber Security Radar Sweep (Right HUD Element)
            const cx = canvas.width * 0.82;
            const cy = canvas.height * 0.5;
            const radius = Math.min(canvas.width, canvas.height) * 0.28;

            if (canvas.width > 768) {
                angle += 0.012;
                ctx.save();
                ctx.translate(cx, cy);

                // Rings
                ctx.strokeStyle = 'rgba(255, 192, 3, 0.08)';
                ctx.beginPath(); ctx.arc(0, 0, radius, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(0, 0, radius * 0.6, 0, Math.PI * 2); ctx.stroke();

                // Crosshairs
                ctx.strokeStyle = 'rgba(255, 192, 3, 0.05)';
                ctx.beginPath(); ctx.moveTo(-radius, 0); ctx.lineTo(radius, 0); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(0, -radius); ctx.lineTo(0, radius); ctx.stroke();

                // Radar Line Sweep
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.arc(0, 0, radius, angle, angle + 0.45);
                ctx.fillStyle = 'rgba(255, 192, 3, 0.04)';
                ctx.fill();

                ctx.restore();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return h('canvas', { ref: canvasRef, className: 'hero-cyber-canvas' });
}

/* ============================================================
   SHARED COMPONENTS
   ============================================================ */

function TiltCard({ as = 'div', className = '', maxTilt = 8, children, ...rest }) {
    const { ref, style, tilting, onMouseMove, onMouseEnter, onMouseLeave } = useTilt(maxTilt);
    return h(
        as,
        {
            ref,
            className: `tilt-card ${tilting ? 'tilting' : ''} ${className}`,
            style,
            onMouseMove,
            onMouseEnter,
            onMouseLeave,
            ...rest,
        },
        h('span', { className: 'tilt-card__hazard', 'aria-hidden': 'true' }),
        h('span', { className: 'tilt-card__rivet tl', 'aria-hidden': 'true' }),
        h('span', { className: 'tilt-card__rivet br', 'aria-hidden': 'true' }),
        h('span', { className: 'tilt-card__glare', 'aria-hidden': 'true' }),
        h('div', { className: 'tilt-card__inner' }, children)
    );
}

function Reveal({ tag = 'div', className = '', children }) {
    const ref = useReveal();
    return h(tag, { ref, className: `reveal ${className}` }, children);
}

/* ============================================================
   HEADER
   ============================================================ */

function Header() {
    const [sticky, setSticky] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setSticky(window.scrollY > 10);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return h(
        'header',
        { className: sticky ? 'sticky' : '' },
        h(
            'a',
            { href: '#main', className: 'brand' },
            h('span', { className: 'dot', 'aria-hidden': 'true' }),
            'Ethan Snyder'
        ),
        h(
            'button',
            {
                className: `menu-btn ${menuOpen ? 'open' : ''}`,
                'aria-label': 'Toggle navigation menu',
                'aria-expanded': menuOpen,
                onClick: () => setMenuOpen((v) => !v),
            },
            h('span'), h('span'), h('span')
        ),
        h(
            'nav',
            { className: `navigation ${menuOpen ? 'show' : ''}` },
            NAV_LINKS.map((link) =>
                h(
                    'a',
                    {
                        key: link.href,
                        href: link.href,
                        className: 'nav-link',
                        onClick: () => setMenuOpen(false),
                    },
                    h('span', { className: 'num' }, link.num),
                    link.label
                )
            )
        )
    );
}

/* ============================================================
   HERO
   ============================================================ */

function TerminalRoles() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [text, setText] = useState('');
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = ROLES[roleIndex];
        const typingSpeed = deleting ? 45 : 85;
        const atFullWord = !deleting && text === current;
        const atEmpty = deleting && text === '';

        let timeout;
        if (atFullWord) {
            timeout = setTimeout(() => setDeleting(true), 1400);
        } else if (atEmpty) {
            timeout = setTimeout(() => {
                setDeleting(false);
                setRoleIndex((i) => (i + 1) % ROLES.length);
            }, 300);
        } else {
            timeout = setTimeout(() => {
                setText(current.slice(0, deleting ? text.length - 1 : text.length + 1));
            }, typingSpeed);
        }
        return () => clearTimeout(timeout);
    }, [text, deleting, roleIndex]);

    return h(
        'div',
        { className: 'hero-terminal' },
        h('span', { className: 'prompt' }, '>'),
        text,
        h('span', { className: 'cursor', 'aria-hidden': 'true' })
    );
}

function Hero() {
    return h(
        'section',
        { className: 'main', id: 'main' },
        h(CyberCanvas),
        h(
            'div',
            { className: 'hero-content' },
            h(
                'div',
                { className: 'hero-tag' },
                h('span', { className: 'pulse', 'aria-hidden': 'true' }),
                'Available for opportunities'
            ),
            h('h1', null, 'Hi, I\u2019m ', h('span', { className: 'accent' }, 'Ethan'), '.'),
            h(TerminalRoles),
            h(
                'p',
                { className: 'hero-sub' },
                'Penn State graduate, PNC Development Program Associate, Security Professional. I build things... and break things... on purpose.'
            ),
            h(
                'div',
                { className: 'hero-actions' },
                h('a', { href: '#projects', className: 'btn-solid' }, 'View Projects', h('i', { className: 'fas fa-arrow-down' })),
                h('a', { href: '#contact', className: 'btn-outline' }, 'Get In Touch')
            )
        ),
        /* Cleaned and Integrated Dynamic Scroll Component */
        h(
            'a',
            { href: '#about', className: 'hero-scroll-interactive', 'aria-label': 'Scroll to About section' },
            h('div', { className: 'mouse-icon' }, h('div', { className: 'wheel' })),
            h('span', { className: 'scroll-label' }, 'SCROLL DOWN')
        )
    );
}

/* ============================================================
   ABOUT
   ============================================================ */

function HobbyBadge({ hobby, index }) {
    const [flipped, setFlipped] = useState(false);
    return h(
        'button',
        {
            type: 'button',
            className: `hobby-badge ${flipped ? 'is-flipped' : ''}`,
            style: { '--delay': `${index * 90}ms` },
            onClick: () => setFlipped((f) => !f),
            'aria-label': `${hobby.label} \u2014 tap for a fun fact`,
        },
        h(
            'span',
            { className: 'hobby-badge__inner' },
            h(
                'span',
                { className: 'hobby-badge__face hobby-badge__face--front' },
                h('i', { className: hobby.icon, 'aria-hidden': 'true' }),
                h('span', null, hobby.label)
            ),
            h(
                'span',
                { className: 'hobby-badge__face hobby-badge__face--back' },
                hobby.fact
            )
        )
    );
}

function HobbiesTile() {
    return h(
        TiltCard,
        { className: 'about-tile hobbies-tile', maxTilt: 5 },
        h('div', { className: 'about-tile__icon' }, h('i', { className: 'fa-solid fa-mug-hot' })),
        h('h4', null, 'Hobbies'),
        h(
            'p',
            { className: 'about-tile__text' },
            'When I\u2019m not coding or studying, I\u2019m usually cooking something new, out on a trail, reading, or digging into offensive security. Tap a badge to learn more.'
        ),
        h(
            'div',
            { className: 'hobby-badges' },
            HOBBIES.map((hobby, i) => h(HobbyBadge, { key: hobby.label, hobby, index: i }))
        )
    );
}

function TravelChip({ place, index }) {
    const style = {
        '--delay': `${index * 45}ms`,
        '--flag-colors': place.colors.join(', '),
    };
    return h(
        'span',
        { className: 'travel-chip', style, title: place.name },
        h('span', { className: 'travel-chip__ring', 'aria-hidden': 'true' }),
        h('span', { className: 'travel-chip__label' }, place.name)
    );
}

function TravelTile() {
    return h(
        TiltCard,
        { className: 'about-tile travel-tile', maxTilt: 5 },
        h('div', { className: 'about-tile__icon' }, h('i', { className: 'fa-solid fa-earth-americas' })),
        h('h4', null, 'Travel'),
        h(
            'p',
            { className: 'about-tile__text' },
            `I love to . \u2014 So far I've set foot in ${TRAVEL_PLACES.length} countries and territories. Hover over each chip for a hint of its flag.`
        ),
        h(
            'div',
            { className: 'travel-flags' },
            TRAVEL_PLACES.map((place, i) => h(TravelChip, { key: place.name, place, index: i }))
        )
    );
}

function ChineseTile() {
    return h(
        TiltCard,
        { className: 'about-tile chinese-tile', maxTilt: 5 },
        h('div', { className: 'about-tile__icon' }, h('i', { className: 'fa-solid fa-language' })),
        h('h4', null, 'Learning Chinese'),
        h(
            'p',
            { className: 'about-tile__text' },
            'I\u2019m currently learning Mandarin. Here\u2019s my name written in Chinese characters.'
        ),
        h(
            'div',
            { className: 'chinese-name-seal' },
            h('span', { className: 'seal-chars' }, '\u6BC5\u8303'),
            h('span', { className: 'seal-chars seal-chars--surname' }, '\u53F8\u8010\u5730')
        ),
        h(
            'div',
            { className: 'learning-tag' },
            h('span', { className: 'pulse', 'aria-hidden': 'true' }),
            'Currently studying'
        )
    );
}

function About() {
    return h(
        'section',
        { className: 'about', id: 'about' },
        h(
            'div',
            { className: 'section-inner' },
            h(
                Reveal,
                { className: 'about-photo-wrap' },
                h(
                    TiltCard,
                    { className: 'about-photo-frame', maxTilt: 6 },
                    h('img', { src: 'images/headshot25.jfif', alt: 'Headshot of Ethan Snyder' }),
                    h('span', { className: 'about-photo-tag' }, 'PENN STATE \u2014 HCI')
                )
            ),
            h(
                Reveal,
                { className: 'about-info' },
                h('div', { className: 'eyebrow' }, '01 / About Me'),
                h('h3', null, 'Hey, I\u2019m Ethan Snyder!'),
                h(
                    'p',
                    { className: 'paragraph-text' },
                    'I am a Penn State graduate with a degree in Human-Computer Interaction and a minor in Security & Risk Analytics, with a strong focus on cybersecurity and offensive security. I have developed my skills through hands-on labs, CTF competitions, and independent research, with a particular interest in system exploitation, detection, and log analysis. I enjoy working on security-focused projects that involve web application exploitation & defense.'
                ),
                h(
                    'p',
                    { className: 'paragraph-text' },
                    'Through my experience at PNC, I have worked across a broad range of areas including AI, automation, cybersecurity, and large-scale data systems, contributing to production-level tooling and analysis. Additionally, during my time with American Eagle Outfitters, I gained exposure to enterprise security practices through shadowing. Feel free to explore my GitHub to see my work, and reach out if you’d like to connect.'
                ),
                h(
                    'a',
                    { href: 'files/Ethan%20Snyder%20Resume.pdf', className: 'resume-link' },
                    h('i', { className: 'fas fa-file-arrow-down' }),
                    'Download a copy of my resume'
                )
            ),
            h(
                Reveal,
                { tag: 'div', className: 'about-tiles' },
                h(HobbiesTile),
                h(TravelTile),
                h(ChineseTile)
            )
        )
    );
}

/* ============================================================
   SKILLS
   ============================================================ */

function SkillCard({ item }) {
    const icon = item.svg
        ? h('div', {
            className: 'skill-logo skill-logo--svg',
            'aria-hidden': 'true',
            style: { color: '#000000' },
            dangerouslySetInnerHTML: { __html: item.svg },
        })
        : h('img', { src: item.img, alt: item.name, className: 'skill-logo' });

    const inner = h(
        React.Fragment,
        null,
        h('div', {
            className: `skill-logo-wrap ${item.isCert ? 'cert-wrap' : ''}`,
            style: {
                borderColor: 'rgba(255, 192, 3, 0.9)',
                backgroundColor: 'rgba(255, 192, 3, 0.12)'
            }
        }, icon),
        h('h4', null, item.name),
        item.isCert && h('div', { className: 'cert-verify-badge' },
            h('i', { className: 'fas fa-shield-halved' }),
            item.verifyText || 'Verify Certificate ↗'
        )
    );

    return h(
        TiltCard,
        {
            as: item.href ? 'a' : 'div',
            href: item.href,
            className: `skill-card ${item.isCert ? 'cert-skill-card' : ''}`,
            maxTilt: 12,
            target: item.href ? '_blank' : undefined,
            rel: item.href ? 'noopener noreferrer' : undefined
        },
        inner
    );
}

function Skills() {
    return h(
        'section',
        { className: 'skills', id: 'skills' },
        h('div', { className: 'grid-backdrop', 'aria-hidden': 'true' }),
        h(
            'div',
            { className: 'section-inner' },
            h(
                Reveal,
                { className: 'skills-heading' },
                h('div', { className: 'eyebrow', style: { justifyContent: 'center' } }, '02 / Capabilities'),
                h('h2', null, 'Skills')
            ),
            SKILL_GROUPS.map((group) =>
                h(
                    Reveal,
                    { key: group.title, tag: 'div', className: 'skills-group' },
                    h('h3', null, group.title),
                    h(
                        'div',
                        { className: 'skills-cards' },
                        group.items.map((item) => h(SkillCard, { key: item.name, item }))
                    )
                )
            )
        )
    );
}

/* ============================================================
   PROJECTS
   ============================================================ */

function ExperienceItem({ job }) {
    return h(
        'div',
        { className: 'experience-item' },
        h('div', { className: 'experience-rail' }, h('span', { className: 'experience-dot' })),
        h(
            'div',
            { className: 'experience-content' },
            h(
                'div',
                { className: 'experience-top' },
                h('h4', null, job.title),
                h('span', { className: 'experience-dates' }, job.dates, ' \u00B7 ', job.duration)
            ),
            h(
                'div',
                { className: 'experience-meta' },
                h('span', { className: 'experience-company' }, job.company, ' \u00B7 ', job.type),
                h('span', { className: 'experience-location' }, job.location)
            ),
            job.bullets.length > 0 && h(
                'ul',
                { className: 'experience-bullets' },
                job.bullets.map((b, i) => h('li', { key: i }, b))
            )
        )
    );
}

function Experience() {
    return h(
        Reveal,
        { tag: 'div', className: 'experience-block' },
        h('h3', { className: 'experience-heading' }, 'Experience'),
        h(
            'div',
            { className: 'experience-timeline' },
            EXPERIENCE.map((job) => h(ExperienceItem, { key: job.title + job.company, job }))
        )
    );
}

function ProjectCard({ project }) {
    return h(
        TiltCard,
        { as: 'a', href: project.href, className: 'project-card', maxTilt: 6, target: '_blank', rel: 'noopener noreferrer' },
        h(
            'div',
            { className: 'project-img-wrap' },
            h('img', { src: project.img, alt: project.title })
        ),
        h(
            'div',
            { className: 'project-body' },
            h(
                'div',
                { className: 'proj-title' },
                project.title,
                h('i', { className: 'fas fa-arrow-up-right-from-square' })
            ),
            h('p', { className: 'proj-description' }, project.description)
        )
    );
}

function Projects() {
    return h(
        'section',
        { className: 'projects', id: 'projects' },
        h(
            'div',
            { className: 'section-inner' },
            h(
                Reveal,
                { className: 'projects-heading' },
                h(
                    'div',
                    null,
                    h('div', { className: 'eyebrow' }, '03 / Selected Work'),
                    h('h2', null, 'Experience & Projects')
                )
            ),
            h(Experience),
            h(
                Reveal,
                { tag: 'div', className: 'projects-subheading' },
                h('h3', null, 'Projects')
            ),
            h(
                Reveal,
                { tag: 'div' },
                h(
                    'div',
                    { className: 'project-track' },
                    PROJECTS.map((project) => h(ProjectCard, { key: project.title, project }))
                )
            )
        )
    );
}

/* ============================================================
   CONTACT
   ============================================================ */

function ContactCard({ card }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(card.value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
    };

    const body = h(
        React.Fragment,
        null,
        h('div', { className: 'contact-icon' }, h('i', { className: card.icon })),
        h('h3', null, card.title),
        card.copyable
            ? h(
                'div',
                { className: 'copy-row' },
                h('span', null, card.value),
                h(
                    'button',
                    { className: `copyButton ${copied ? 'copied' : ''}`, onClick: handleCopy, 'aria-label': 'Copy email address' },
                    h('i', { className: copied ? 'fas fa-check' : 'fas fa-copy' })
                )
            )
            : h('span', null, card.value)
    );

    return h(
        TiltCard,
        { as: card.href ? 'a' : 'div', href: card.href, target: card.href ? '_blank' : undefined, rel: card.href ? 'noopener noreferrer' : undefined, className: 'contact-card', maxTilt: 7 },
        body
    );
}

function Contact() {
    return h(
        'section',
        { className: 'contact', id: 'contact' },
        h('div', { className: 'grid-backdrop', 'aria-hidden': 'true' }),
        h(
            'div',
            { className: 'section-inner' },
            h(
                Reveal,
                { className: 'contact-heading' },
                h('div', { className: 'eyebrow', style: { justifyContent: 'center' } }, '04 / Say Hello'),
                h('h2', null, 'Contact Me')
            ),
            h(
                Reveal,
                { tag: 'div', className: 'contact-row' },
                CONTACT_CARDS.map((card) => h(ContactCard, { key: card.title, card }))
            )
        )
    );
}

/* ============================================================
   FOOTER
   ============================================================ */

function Footer() {
    return h(
        'footer',
        null,
        h('span', null, `\u00A9 ${new Date().getFullYear()} Ethan Snyder`)
    );
}

/* ============================================================
   APP
   ============================================================ */

function App() {
    return h(
        React.Fragment,
        null,
        h(Header),
        h(Hero),
        h(About),
        h(Skills),
        h(Projects),
        h(Contact),
        h(Footer)
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(h(App));