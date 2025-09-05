'use client';

import css from './TagsMenu.module.css';

export default function TagsMenu() {
    return (
        <div>
            <div className={css.menuContainer}>
                <button className={css.menuButton}>
                    Notes ▾
                </button>
                <ul className={css.menuList}>
                    {/* список тегів */}
                    <li className={css.menuItem}>
                        <a href={`/notes/filter/Work`} className={css.menuLink}>
                            Work
                        </a>
                    </li>
                </ul>
            </div>

        </div>
    );
}