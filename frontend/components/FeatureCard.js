'use client';

import { motion } from 'framer-motion';

export default function FeatureCard({ title, description, icon: Icon, color, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="card p-8 group hover:border-primary-500/50 transition-all 
                 duration-500 relative overflow-hidden"
        >
            <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-5 
                    rounded-bl-full group-hover:scale-150 transition-transform 
                    duration-700`} />

            <div className={`w-12 h-12 rounded-xl ${color} bg-opacity-10 
                    flex items-center justify-center mb-6 
                    group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 
                   group-hover:text-primary-600 dark:group-hover:text-primary-400 
                   transition-colors">
                {title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
}
