import { motion } from "framer-motion";
import { Users, Briefcase, BarChart3 } from "lucide-react";
import { Meteors } from "@/components/ui/meteors";

const features = [
  {
    icon: Users,
    title: "For Students",
    description: "Build your professional profile, create stunning resumes, and apply to exciting job opportunities all in one place.",
    gradient: "from-secondary/20 to-secondary/5",
  },
  {
    icon: Briefcase,
    title: "For Recruiters",
    description: "Post job openings, discover talented candidates, and streamline your recruitment process with powerful tools.",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    icon: BarChart3,
    title: "For Placement Cell",
    description: "Comprehensive dashboard, detailed reports, and efficient management of placement drives and campus recruitment.",
    gradient: "from-muted/30 to-muted/5",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 md:py-32" style={{ backgroundColor: '#011627ff' }}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: '#e25c28ff' }}>
            Built for Everyone
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: '#f1f7edff' }}>
            Tailored features for students, recruiters, and placement teams
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div 
                className="relative p-8 rounded-3xl border border-border overflow-hidden transition-all duration-300 hover:-translate-y-2 h-full"
                style={{ 
                  backgroundColor: '#011627ff',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              >
                <div className="relative z-10">
                  <div className="mb-6">
                    <feature.icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: '#e25c28ff' }}>
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: '#f1f7edff' }}>
                    {feature.description}
                  </p>
                </div>
                <Meteors number={20} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
