import { useState } from 'react';

// The master's photo is loaded from /public/master.jpg — drop your image there.
// If the file is missing, a friendly fallback is shown and the build still works.
const MASTER_PHOTO = '/master.jpg';

export default function Hero() {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="home" className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-text">
            <div className="hero-eyebrow fade-up">Авторский маникюр в Ереване</div>
            <h1 className="fade-up">
              Искусство <em>ухоженных</em> рук — в каждой детали
            </h1>
            <p className="lead fade-up">
              Индивидуальный подход, премиальные материалы и внимание к мелочам. Ваши ногти
              заслуживают мастера, который работает с душой и точностью — ровно десять лет подряд.
            </p>
            <div className="cta-row fade-up">
              <a href="#contact" className="btn btn-primary">Записаться</a>
              <a href="#advantages" className="btn btn-ghost">Узнать больше</a>
            </div>
          </div>

          <div className="hero-image fade-up">
            {!imgError && (
              <img
                src={MASTER_PHOTO}
                alt="Мастер маникюра"
                onError={() => setImgError(true)}
              />
            )}
            {imgError && (
              <div className="hero-image-inner">
                Поместите фото в <code>public/master.jpg</code>
              </div>
            )}
            <div className="hero-image-frame" />
            <div className="hero-image-badge">Ваш мастер</div>
          </div>
        </div>
      </div>
    </section>
  );
}
