import { useLayoutEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import './App.css'

const noMessages = [
  {
    title: 'Theek hai... 🥺',
    lines: [
      'Par please ek baar aur soch lena...',
      'Mujhe sach mein bahut bura lag raha hai.',
    ],
    button: 'Ek baar aur sochungi/sochunga',
  },
  {
    title: 'Itna gussa ho mujhse? 😭',
    lines: [
      'Samajh raha hoon...',
      'par please mujhe ek mauka toh de.',
    ],
  },
  {
    title: 'Achha... nahi maaf karna abhi toh mat kar 😭',
    lines: ['Bas mujhse baat karna band mat karna please.'],
  },
  {
    title: 'Meri galti thi... 🥺',
    lines: ['Par jo cheez hai hi nahi uske liye mujhe galat mat samajhna please.'],
  },
  {
    title: 'Tu chahe jitna gussa kar le...',
    lines: ['main fir bhi yehi bolunga...', 'Mujhe tu chahiye, koi aur nahi.'],
  },
  {
    title: 'Please yaar... 😭',
    lines: [
      'Main ego mein aake tujhe khona nahi chahta.',
      'Tu mere liye bahut important hai.',
    ],
  },
  {
    title: 'Achha baba 😭',
    lines: ['Ab nahi bolunga kuch...', 'Bas ek baar meri baat dil se maan lena.'],
  },
  {
    title: 'Still nahi? 🥺',
    lines: [
      'Okay...',
      'Main tujhe force nahi karunga.',
      'Bas jab gussa thoda kam ho jaaye na...',
    ],
    emphasis: 'mujhse baat kar lena please.',
  },
  {
    title: 'Mujhe bas mera wala tu wapas chahiye...',
    lines: ['Jo mujhse ladti hai...', 'mujhe daantti hai...', 'par mujhse baat karti hai.'],
    emphasis: 'Please wapas aa ja.',
  },
]

const particles = [
  { left: '8%', top: '16%', delay: 0 },
  { left: '19%', top: '72%', delay: 1.6 },
  { left: '31%', top: '34%', delay: 0.8 },
  { left: '44%', top: '87%', delay: 2.4 },
  { left: '59%', top: '12%', delay: 1.1 },
  { left: '71%', top: '61%', delay: 0.4 },
  { left: '83%', top: '28%', delay: 2 },
  { left: '94%', top: '79%', delay: 1.3 },
]

function AmbientParticles() {
  return (
    <div className="ambient-particles" aria-hidden="true">
      {particles.map((particle, index) => (
        <motion.span
          className="ambient-particle"
          key={particle.left}
          style={{ left: particle.left, top: particle.top }}
          animate={{ opacity: [0.12, 0.48, 0.12], y: [0, -9, 0] }}
          transition={{ duration: 5 + (index % 3), delay: particle.delay, repeat: Infinity }}
        />
      ))}
    </div>
  )
}

function RevealLines({ lines }) {
  return (
    <motion.div
      className="reveal-lines"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
    >
      {lines.map((line) => (
        <motion.p
          key={line}
          variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          {line}
        </motion.p>
      ))}
    </motion.div>
  )
}

function PhotoMoment({ src, number, title, lines, emphasis, alt }) {
  return (
    <motion.figure
      className="photo-moment"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="photo-frame">
        <img src={src} alt={alt} loading="lazy" />
      </div>
      <figcaption className="photo-copy">
        <span className="photo-number">{number} / ek baat dil se</span>
        <h2>{title}</h2>
        <RevealLines lines={lines} />
        {emphasis && (
          <p className="emphasis-line">
            {Array.isArray(emphasis)
              ? emphasis.map((line, index) => (
                <span key={line}>{index > 0 && <br />}{line}</span>
              ))
              : emphasis}
          </p>
        )}
      </figcaption>
    </motion.figure>
  )
}

function App() {
  const [opened, setOpened] = useState(false)
  const [screen, setScreen] = useState('letter')
  const [noCount, setNoCount] = useState(0)
  const [activeNo, setActiveNo] = useState(null)
  const [ending, setEnding] = useState(null)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [screen])

  function handleNo() {
    if (noCount === noMessages.length) {
      setEnding('no')
      return
    }

    setActiveNo(noCount)
    setNoCount((count) => count + 1)
  }

  return (
    <div className="app-shell">
      <AmbientParticles />
      <AnimatePresence mode="wait">
        {screen === 'letter' && !opened && (
          <motion.main
            className="intro-screen"
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.75 }}
          >
            <div className="intro-mark"><span /> bas ek baat</div>
            <div className="intro-copy">
              <p className="eyebrow">sach mein dil se</p>
              <h1>Please... ek baar poora padh lena 🥺</h1>
              <p className="intro-note">Gussa ho mujhse, hona bhi chahiye shayad...<br />par please bina poora padhe jaana mat.</p>
              <button className="primary-button" onClick={() => setOpened(true)}>
                Padh rahi hoon 🥺 <span aria-hidden="true">↗</span>
              </button>
            </div>
            <span className="intro-footnote">koi jaldi nahi hai</span>
          </motion.main>
        )}

        {screen === 'letter' && opened && (
          <motion.main
            className="letter-screen"
            key="letter"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <header className="page-topline">
              <span>ek baat dil se</span>
              <span>01 <i /> 02</span>
            </header>

            <section className="letter-opening story-width">
              <p className="eyebrow">please poora padhna</p>
              <h1>Mujhe pata hai tu mujhse naraz hai...</h1>
              <RevealLines lines={[
                'aur sach bolu toh mujhe bilkul acha nahi lag raha ki meri wajah se tu itni hurt hai.',
                'Main baar baar safai deke tujhe aur irritate nahi karna chahta...',
                'bas ek baar dil se bolna hai.',
              ]} />
              <p className="emphasis-line">Mera kisi aur ke saath kuch bhi nahi hai.</p>
              <RevealLines lines={[
                'Main kisi aur ke chakkar mein nahi hoon.',
                'Sach mein nahi hoon.',
                'Tu jo soch rahi hai na...',
                'ki main kisi aur se baat karta hoon ya kuch aur hai...',
              ]} />
              <p className="emphasis-line">aisa kuch bhi nahi hai yaar.</p>
              <p className="story-paragraph">Kaash main tujhe apne dimaag ke andar ka sab kuch dikha pata...<br />toh tujhe khud pata chal jaata ki mere liye tu kya hai.</p>
            </section>

            <div className="story-width photo-stack">
              <PhotoMoment
                src="/image1.jpeg"
                number="01"
                alt="Hum dono ki ek yaad"
                title="Maine jaan ke kabhi tujhe hurt nahi karna chaha..."
                lines={[
                  'par meri galti ye hai ki maine shayad tujhe wo feel nahi karaya jo tujhe feel karna chahiye tha.',
                  'Isliye agar tu gussa hai...',
                  'toh main samajh sakta hoon.',
                ]}
              />
              <PhotoMoment
                src="/image2.jpeg"
                number="02"
                alt="Hum dono ki ek aur yaad"
                title="Bas ek cheez please maan le..."
                lines={[
                  'Tu mere liye koi timepass nahi hai.',
                  'Koi option nahi hai.',
                  'Aur na hi koi aisi hai jise main kal bhool jaunga.',
                ]}
                emphasis={[
                  'Main tujhe khona nahi chahta.',
                  'Bilkul bhi nahi.',
                  'Tu important hai mere liye... bahut zyada.',
                ]}
              />
            </div>

            <section className="promise-section story-width">
              <p className="eyebrow">aur haan...</p>
              <h2>ab se tu jaisa bolegi,<br />main waise hi karunga.</h2>
              <RevealLines lines={[
                'Jo cheez tujhe hurt karti hai, main usse avoid karunga.',
                'Jo cheez tujhe buri lagti hai, usko seriously lunga.',
                'Bas meri ek request hai...',
              ]} />
              <p className="promise-last">Mujhse naraz rehna...<br />par mujhse door mat jaana please. 🥺</p>
              <button className="text-button" onClick={() => setScreen('question')}>
                Bas ek aakhri baat <span aria-hidden="true">↓</span>
              </button>
            </section>
          </motion.main>
        )}

        {screen === 'question' && (
          <motion.main
            className="question-screen"
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img className="question-photo" src="/image3.jpeg" alt="Hum dono ki ek khaas yaad" />
            <div className="question-shade" />
            <header className="page-topline question-topline">
              <span>ek aakhri baat</span>
              <span>02 <i /> 02</span>
            </header>

            {ending ? (
              <motion.section
                className="ending-copy"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {ending === 'yes' ? (
                  <>
                    <p className="eyebrow">dil ko thoda sukoon mila</p>
                    <h1>Sach mein? 🥺❤️</h1>
                    <RevealLines lines={[
                      'Thank you...',
                      'Main promise karta hoon...',
                      'ab teri feelings ko kabhi lightly nahi lunga.',
                      'Jo bhi hoga, tujhse baat karke hoga.',
                      'Bas hum dono ke beech koi galatfehmi nahi rehni chahiye.',
                    ]} />
                    <p className="emphasis-line">Aur haan...<br />ab se tu jaisa bolegi, main waise hi karunga. ❤️</p>
                    <p className="ending-last">Aur please ab gussa thoda kam kar de na 🥺</p>
                  </>
                ) : (
                  <>
                    <p className="eyebrow">main yahin hoon</p>
                    <h1>Theek hai... 🥺</h1>
                    <RevealLines lines={['Ab main tujhe force nahi karunga.', 'Tu jab ready ho tab baat kar lena.']} />
                    <p className="emphasis-line">Main yahin hoon.</p>
                    <p className="ending-last">Bas ek baar...<br />Please mujhe completely mat chhodna. ❤️</p>
                  </>
                )}
              </motion.section>
            ) : (
              <motion.section
                className="question-copy"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="eyebrow">sach mein pooch raha hoon</p>
                <h1>Bas ek aakhri baat poochu? 🥺</h1>
                <h2>Kya tu mujhe maaf kar degi?</h2>
                <RevealLines lines={[
                  'Abhi nahi karna toh koi baat nahi...',
                  'thoda time le lena...',
                  'jitna gussa hai kar lena...',
                  'bas mujhe completely chhod ke mat jaana.',
                ]} />
                <p className="emphasis-line">Main sach mein sab theek karna chahta hoon.</p>
                <div className="answer-buttons">
                  <button className="primary-button yes-button" onClick={() => setEnding('yes')}>Haan 🥺❤️</button>
                  <button className="quiet-button" onClick={handleNo}>Nahi 😭</button>
                </div>
              </motion.section>
            )}

          </motion.main>
        )}
      </AnimatePresence>
      {screen === 'question' && createPortal(
        <AnimatePresence>
          {activeNo !== null && (
            <motion.div
              className="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveNo(null)}
            >
              <motion.section
                className="no-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="no-dialog-title"
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                onClick={(event) => event.stopPropagation()}
              >
                <p className="eyebrow">ek baat aur</p>
                <h2 id="no-dialog-title">{noMessages[activeNo].title}</h2>
                <RevealLines lines={noMessages[activeNo].lines} />
                {noMessages[activeNo].emphasis && <p className="emphasis-line">{noMessages[activeNo].emphasis}</p>}
                <button className="primary-button dialog-button" onClick={() => setActiveNo(null)}>
                  {noMessages[activeNo].button ?? 'Theek hai'}
                </button>
              </motion.section>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  )
}

export default App
