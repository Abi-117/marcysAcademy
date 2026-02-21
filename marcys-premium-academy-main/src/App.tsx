import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Overview from "./pages/Overview";
import Privacy from "./pages/Privacy";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminIndexPage from "./admin/AdminIndexPage";
import AdminAboutPage from "./admin/AdminAboutPage";
import AdminServicesPage from "./admin/AdminServicesPage";
import AdminGallery from "./admin/AdminGallery";
import AdminPage from "./admin/AdminPage";
import ContactAdmin from "./admin/AdminContact";
import EnquiryAdmin from "./admin/EnquiryAdmin";
import HeroSlidesAdmin from "./admin/HeroSlidesAdmin";
import AdminMusicPrograms from "./admin/AdminMusicPrograms";
import AdminMusicProgramCreate from "./admin/AdminMusicProgramCreate";
import AdminMusicProgramEdit from "./admin/AdminMusicProgramEdit";
import AdminPerformancePrograms from "./admin/AdminPerformancePrograms";
import AdminPerformanceServiceCreate from "./admin/AdminPerformanceServiceCreate";
import AdminPerformanceServiceEdit from "./admin/AdminPerformanceServiceEdit";

import AdminTestimonials from "./admin/AdminTestimonials";
import AdminTestimonialCreate from "./admin/AdminTestimonialCreate";
import AdminTestimonialEdit from "./admin/AdminTestimonialEdit";

import AdminResults from "./admin/AdminResults";
import AdminResultCreate from "./admin/AdminResultCreate";
import AdminResultEdit from "./admin/AdminResultEdit";



import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
  {/* PUBLIC PAGES */}
  <Route path="/" element={<Index />} />
  <Route path="/about" element={<About />} />
  <Route path="/services" element={<Services />} />
  <Route path="/gallery" element={<Gallery />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/overview" element={<Overview />} />
  <Route path="/privacy" element={<Privacy />} />

  {/* ADMIN LOGIN */}
  <Route path="/admin/login" element={<AdminLogin />} />

  {/* ADMIN DASHBOARD */}
  <Route path="/admin/dashboard" element={<AdminDashboard />} />

  {/* ADMIN SECTIONS */}
  <Route path="/admin/index" element={<AdminIndexPage />} />
  <Route path="/admin/about" element={<AdminAboutPage />} />
  <Route path="/admin/services" element={<AdminServicesPage />} />
  <Route path="/admin/gallery" element={<AdminGallery />} />
  <Route path="/admin/overview" element={<AdminPage />} />
  <Route path="/admin/contact" element={<ContactAdmin />} />
  <Route path="/admin/booknow" element={<EnquiryAdmin />} />

  {/* HERO SLIDES */}
  <Route path="/admin/hero/create" element={<HeroSlidesAdmin />} />
  <Route path="/admin/hero/edit/:id" element={<HeroSlidesAdmin />} />

{/* Music Programs */}
  <Route path="/admin/programs" element={<AdminMusicPrograms />} />
  <Route path="/admin/programs/create" element={<AdminMusicProgramCreate />} />
  <Route path="/admin/programs/edit/:id" element={<AdminMusicProgramEdit />} />

  {/* Performance Services */}
  <Route path="/admin/performance-services" element={<AdminPerformancePrograms />} />
  <Route path="/admin/performance-services/create" element={<AdminPerformanceServiceCreate />} />
  <Route path="/admin/performance-services/edit/:id" element={<AdminPerformanceServiceEdit />} />

  {/* Results */}
  <Route path="/admin/results" element={<AdminResults />} />
  <Route path="/admin/results/create" element={<AdminResultCreate />} />
  <Route path="/admin/results/edit/:id" element={<AdminResultEdit />} />

  {/* Testimonials */}
  <Route path="/admin/testimonials" element={<AdminTestimonials />} />
  <Route path="/admin/testimonials/create" element={<AdminTestimonialCreate />} />
  <Route path="/admin/testimonials/edit/:id" element={<AdminTestimonialEdit />} />
   <Route path="/admin/enquiries" element={<EnquiryAdmin />} />

  {/* CATCH-ALL */}
  <Route path="*" element={<NotFound />} />
</Routes>

      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
