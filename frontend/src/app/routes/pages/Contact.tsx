import { Canvas } from '@react-three/fiber';
import React, { Suspense, useRef, useState } from 'react';
import Loader from '../../../components/Loader';
import Navbar from '../../../components/Navbar';

import { Fox } from '../../../features/landing/models/Fox';

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('idle');

  const handleChange = () => {};

  const handleFocus = () => setCurrentAnimation('walk');
  const handleBlur = () => setCurrentAnimation('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setCurrentAnimation('hit');

    alert('Message sent successfully!');
  };

  return (
    <>
      <Navbar />
      <section className="max-container relative flex flex-col lg:flex-row">
        <div className="flex min-w-[50%] flex-1 flex-col">
          <h1 className="head-text">Get in Touch</h1>

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