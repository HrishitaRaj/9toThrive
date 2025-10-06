import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Computer Science Student",
    avatar: "PS",
    content: "9toThrive made my placement journey incredibly smooth. I connected with amazing recruiters and landed my dream job within weeks!",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "HR Manager, Tech Corp",
    avatar: "RV",
    content: "Finding talented candidates has never been easier. The platform is intuitive and the quality of applicants is exceptional.",
    rating: 5,
  },
  {
    name: "Dr. Anjali Patel",
    role: "Placement Officer, ABC University",
    avatar: "AP",
    content: "The comprehensive dashboard and reporting tools have transformed how we manage campus placements. Highly recommended!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 md:py-32" style={{ backgroundColor: '#011627ff' }}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: '#e25c28ff' }}>
            What People Say
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: '#f1f7edff' }}>
            Hear from students, recruiters, and placement officers who've found success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="p-8 rounded-3xl border border-border transition-all duration-300 h-full" style={{ backgroundColor: '#011627ff', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="fill-[#e25c28ff]" style={{ color: '#e25c28ff' }} size={20} />
                  ))}
                </div>
                <p className="mb-6 leading-relaxed italic" style={{ color: '#f1f7edff' }}>
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: '#e25c28ff', color: '#f1f7edff' }}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold" style={{ color: '#e25c28ff' }}>{testimonial.name}</h4>
                    <p className="text-sm" style={{ color: '#f1f7edff' }}>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
