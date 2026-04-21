import { useState } from 'react';

const INITIAL = { name: '', phone: '', date: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
    if (errors[key]) setErrors({ ...errors, [key]: false });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = true;
    if (!form.phone.trim()) nextErrors.phone = true;
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    // In production: POST to your backend / Telegram bot / email service here.
    console.log('Booking request:', form);
    setSent(true);
  };

  return (
    <section id="contact" className="contact">
      <div className="wrap">
        <div className="section-head fade-up">
          <span className="section-eyebrow">Запись</span>
          <h2>Оставьте заявку</h2>
          <p>
            Заполните форму, и я свяжусь с вами в течение нескольких часов, чтобы подобрать удобное время.
          </p>
        </div>

        <div className="form-wrap fade-up">
          {!sent ? (
            <form onSubmit={onSubmit} noValidate>
              <div className="field">
                <label htmlFor="name">Имя</label>
                <input
                  type="text"
                  id="name"
                  value={form.name}
                  onChange={update('name')}
                  autoComplete="name"
                  style={errors.name ? { borderBottomColor: '#c95b5b' } : undefined}
                />
              </div>
              <div className="field">
                <label htmlFor="phone">Телефон</label>
                <input
                  type="tel"
                  id="phone"
                  value={form.phone}
                  onChange={update('phone')}
                  autoComplete="tel"
                  placeholder="+374 ..."
                  style={errors.phone ? { borderBottomColor: '#c95b5b' } : undefined}
                />
              </div>
              <div className="field">
                <label htmlFor="date">Желаемая дата</label>
                <input
                  type="text"
                  id="date"
                  value={form.date}
                  onChange={update('date')}
                  placeholder="Например, суббота, вторая половина дня"
                />
              </div>
              <div className="field">
                <label htmlFor="message">Комментарий</label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Пожелания по дизайну, длине, услуге..."
                />
              </div>
              <button type="submit" className="btn btn-primary form-submit">
                Отправить заявку
              </button>
              <p className="form-note">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
              </p>
            </form>
          ) : (
            <div className="form-success show">
              Спасибо! Ваша заявка принята.
              <br />
              Свяжусь с вами в ближайшее время.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
