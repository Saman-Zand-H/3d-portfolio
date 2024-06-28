import ProjectCard from '../../../features/landing/components/ProjectCard';
import ContactCard from '../../../components/ContactCard';
import { projects } from '../../../features/landing/constants';
import Navbar from '../../../components/Navbar';

const Projects = () => {
  return (
    <>
      <Navbar />
      <section className="max-container">
        <h1 className="head-text">
          My{' '}
          <span className="blue-gradient_text font-semibold drop-shadow">
            Projects
          </span>
        </h1>

        <p className="mt-2 leading-relaxed text-slate-500">
          I've embarked on numerous projects throughout the years, but these are
          the ones I hold closest to my heart. Many of them are open-source, so
          if you come across something that piques your interest, feel free to
          explore the codebase and contribute your ideas for further
          enhancements. Your collaboration is highly valued!
        </p>

        <div className="my-20 flex flex-wrap gap-16">
          {projects.map((project) => (
            <ProjectCard project={project} />
          ))}
        </div>

        <hr className="border-slate-200" />

        <ContactCard />
      </section>
    </>
  );
};

export default Projects;
