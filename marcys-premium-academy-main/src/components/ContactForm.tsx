import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, User, Phone, Mail, MessageSquare, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    appointmentDate: null as Date | null,
    classMode: 'online',
  });
  // Add state at the top of Contact component
const [classMode, setClassMode] = useState('online');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Format appointment date nicely
    const formattedDate = formData.appointmentDate
      ? formData.appointmentDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
      : 'No date selected';

    // Create WhatsApp message with form data
    const whatsappMessage = encodeURIComponent(
      `New Inquiry from Website:\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nAppointment Date: ${formattedDate}\n\nMessage: ${formData.message}`
    );

    // Open WhatsApp with the form data
    window.open(`https://wa.me/919025849150?text=${whatsappMessage}`, '_blank');

    setIsSubmitting(false);
    setIsSubmitted(true);

    toast({
      title: "Message Sent!",
      description: "We'll get back to you shortly.",
    });

    // Reset form after delay
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', phone: '', email: '', message: '', appointmentDate: null, classMode: 'online' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="premium-card rounded-2xl p-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-20 h-20 mx-auto rounded-full bg-gold/20 flex items-center justify-center mb-6"
        >
          <CheckCircle className="w-10 h-10 text-gold" />
        </motion.div>
        <h3 className="font-display text-2xl font-bold text-foreground mb-2">
          Thank You!
        </h3>
        <p className="text-muted-foreground">
          Your message has been sent. We'll contact you soon!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="premium-card rounded-2xl p-8 md:p-12 space-y-6"
    >
      <div className="text-center mb-8">
        <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
          Send us a Message
        </h3>
        <p className="text-muted-foreground">
          Fill out the form and we'll get back to you shortly
        </p>
      </div>

      <div className="space-y-5">
        {/* Name */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="pl-12 h-14 bg-background/50 border-gold/20 focus:border-gold rounded-xl transition-all duration-300"
          />
        </motion.div>

        {/* Phone */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="pl-12 h-14 bg-background/50 border-gold/20 focus:border-gold rounded-xl transition-all duration-300"
          />
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="pl-12 h-14 bg-background/50 border-gold/20 focus:border-gold rounded-xl transition-all duration-300"
          />
        </motion.div>
        <div className="mb-8 max-w-md mx-auto">
  <label htmlFor="classModeDropdown" className="block mb-2 text-sm font-medium text-muted-foreground">
    Select Class Mode
  </label>
  <select
    id="classModeDropdown"
    value={classMode}
    onChange={(e) => setClassMode(e.target.value)}
    className="w-full h-14 rounded-xl border border-gold/20 bg-background/50 text-foreground px-4 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
  >
    <option value="online">Online</option>
    <option value="offline">Offline</option>
  
  </select>
</div>

        {/* Appointment Date */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <DatePicker
            selected={formData.appointmentDate}
            onChange={(date) => setFormData((prev) => ({ ...prev, appointmentDate: date }))}
            minDate={new Date()}
            placeholderText="Select Appointment Date"
            className="pl-12 h-14 w-full bg-background/50 border-gold/20 focus:border-gold rounded-xl transition-all duration-300"
          />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="relative"
        >
          <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
          <Textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="pl-12 pt-4 bg-background/50 border-gold/20 focus:border-gold rounded-xl resize-none transition-all duration-300"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        viewport={{ once: true }}
      >
        <Button
          type="submit"
          variant="hero"
          size="xl"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-5 h-5 border-2 border-background border-t-transparent rounded-full"
            />
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default ContactForm;