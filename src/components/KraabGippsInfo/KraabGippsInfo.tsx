import React from 'react';
import styles from './KraabGippsInfo.module.scss';
import kraabImage from '../../assets/888788.jpg';

export const KraabGippsInfo: React.FC = () => {
  return (
    <section className={styles.kraabGipps}>
      <img src={kraabImage} alt="KRAAB GIPPS теневой профиль" className={styles.kraabGipps__background} />
      <div className={styles.kraabGipps__container}>
        <div className={styles.kraabGipps__prefix}>ИННОВАЦИОННЫЕ РЕШЕНИЯ</div>
        <h2 className={styles.kraabGipps__title}>ТЕНЕВОЙ ПРОФИЛЬ KRAAB GIPPS</h2>
        <div className={styles.kraabGipps__content}>
          <div className={styles.kraabGipps__text}>
            <p>
              Позволяет создать потолки с уникальным дизайном и эстетикой, благодаря теневому зазору 
              и идеальному сопряжению цветов гипсокартонного потолка и стен.
            </p>
            <p>
              Теневой шов хорошо смотрится как на ровных поверхностях стен, так и на плитке, 
              декоративном кирпиче, 3D панелях и других материалах, образующих не ровную поверхность стен.
            </p>
          </div>
          <div className={styles.kraabGipps__text}>
            <p>
              Идеальное сопряжение контрастных цветов получается за счёт отступа краёв потолка от стен, 
              вследствие чего отпадает необходимость проведения малярных работ в области примыкания 
              потолка к стенам.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KraabGippsInfo; 