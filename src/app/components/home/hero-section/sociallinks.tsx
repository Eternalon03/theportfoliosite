import styles from './SocialLinks.module.css';
import { FaGithub, FaLinkedinIn, FaItchIo } from 'react-icons/fa';

const SocialLinks = () => {
    const socials = [
        { name: 'linkedin', icon: <FaLinkedinIn />, label: 'LinkedIn', url: 'https://linkedin.com/in/nicole-planeta' },
        { name: 'github', icon: <FaGithub />, label: 'Github', url: 'https://github.com/eternalon03' },
        { name: 'itchio', icon: <FaItchIo />, label: 'Itch.io', bold: true, url: 'https://eternalon03.itch.io/' },
    ];

    return (
        <div className={styles.wrapper}>
            {socials.map((social) => (
                <div key={social.name} className={`${styles.holder} ${styles[social.name]}`}>
                    {/* Changed to <a> tag */}
                    <a 
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={styles.icon}
                    >
                        {social.icon}
                    </a>
                    
                    <span className={`
                        ${styles.tooltip} 
                        ${social.bold ? styles.boldText : ''}
                    `}>
                        {social.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default SocialLinks;