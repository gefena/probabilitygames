import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function GameCard({ to, emoji, title, desc, color }) {
  const navigate = useNavigate()

  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -4 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(to)}
      className={`rounded-3xl p-6 text-start shadow-md cursor-pointer border-2 border-transparent hover:border-white transition-all ${color}`}
    >
      <div className="text-5xl mb-3">{emoji}</div>
      <h2 className="text-xl font-extrabold text-white mb-1">{title}</h2>
      <p className="text-sm text-white/80 leading-relaxed">{desc}</p>
    </motion.button>
  )
}
