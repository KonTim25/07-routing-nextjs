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
                        <a href={`url до сторінки за відповідним тегом`} className={css.menuLink}>
                            Назва тегу
                        </a>
                    </li>
                </ul>
            </div>

        </div>
    );
}