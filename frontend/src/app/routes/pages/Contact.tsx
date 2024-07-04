import { Canvas } from '@react-three/fiber';
import React, { Suspense, useRef, useState } from 'react';
import Loader from '../../../components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../../../components/Navbar';
import emailjs from '@emailjs/browser';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TelegramIcon from '@mui/icons-material/Telegram';
import EmailIcon from '@mui/icons-material/Mail';

import 'react-toastify/dist/ReactToastify.min.css';
import { env } from '../../../config/env';
import { Fox } from '../../../features/landing/models/Fox';

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('idle');

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setForm({ ...form, [name]: value });
  };

  const handleFocus = () => setCurrentAnimation('walk');
  const handleBlur = () => setCurrentAnimation('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setCurrentAnimation('hit');

    emailjs
      .send(
        env.EMAILJS_SERVICE_ID,
        env.EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: 'JavaScript Mastery',
          from_email: form.email,
          to_email: 'sujata@jsmastery.pro',
          message: form.message,
        },
        env.EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setLoading(false);
          toast.success('Thank you for your message', {
            autoClose: 3000,
            position: 'bottom-left',
          });
        },
        (_) => {
          setLoading(false);
          setCurrentAnimation('idle');

          toast.error("I didn't receive your message", {
            autoClose: 3000,
            position: 'bottom-left',
          });
        },
      );
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <section className="max-container relative flex flex-col lg:flex-row">
        <div className="flex min-w-[50%] flex-1 flex-col">
          <h1 className="head-text">Get in Touch</h1>

          <div className="ml-11 mt-4 flex flex-wrap gap-6">
            <span>
              <a href="mailto:samanzandh@gmail.com">
                <EmailIcon fontSize="large" />
              </a>
            </span>

            <span>
              <a href="https://github.com/saman-zand-h" target="_blank">
                <GitHubIcon className="text-slate-700" fontSize="large" />
              </a>
            </span>

            <span>
              <a href="https://telegram.me/RobSaman" target="_blank">
                <TelegramIcon className="text-sky-700" fontSize="large" />
              </a>
            </span>

            <span>
              <a href="https://linkedin.com/in/saman-zand-h" target="_blank">
                <LinkedInIcon className="text-blue-800" fontSize="large" />
              </a>
            </span>
          </div>

          <form
            onSubmit={handleSubmit}
            ref={formRef}
            className="mt-14 flex w-full flex-col gap-7"
          >
            <label className="font-semibold text-black-500">
              Name
              <input
                type="text"
                name="name"
                className="input"
                placeholder="John"
                required
                value={form.name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>
            <label className="font-semibold text-black-500">
              Email
              <input
                type="email"
                name="email"
                className="input"
                placeholder="John@gmail.com"
                required
                value={form.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>
            <label className="font-semibold text-black-500">
              Your Message
              <textarea
                name="message"
                rows={4}
                className="textarea"
                placeholder="Write your thoughts here..."
                value={form.message}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="btn"
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              {loading ? 'Sending...' : 'Submit'}
            </button>
          </form>
        </div>

        <div className="h-[350px] w-full md:h-[550px] lg:h-auto lg:w-1/2">
          <Canvas
            camera={{
              position: [0, 0, 5],
              fov: 75,
              near: 0.1,
              far: 1000,
            }}
          >
            <directionalLight position={[0, 0, 1]} intensity={2.5} />
            <ambientLight intensity={1} />
            <pointLight position={[5, 10, 0]} intensity={2} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={2}
            />

            <Suspense fallback={<Loader />}>
              <Fox
                currentAnimation={currentAnimation}
                position={[0.5, 0.35, 0]}
                rotation={[12.629, -0.6, 0]}
                scale={[0.5, 0.5, 0.5]}
              />
            </Suspense>
          </Canvas>
        </div>
      </section>
    </>
  );
};

export default Contact;
