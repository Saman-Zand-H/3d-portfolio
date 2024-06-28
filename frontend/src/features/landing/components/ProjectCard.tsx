import { Project } from '../types';
import { arrow } from '../../../assets/icons';
import { Link } from 'react-router-dom';

type ProjectProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectProps) => {
  return (
    <div className="w-full lg:w-[400px]" key={project.name}>
      <div className="block-container h-12 w-12">
        <div className={`btn-back rounded-xl ${project.theme}`} />
        <div className="btn-front flex items-center justify-center rounded-xl">
          <img
            src={project.iconUrl}
            alt="threads"
            className="h-1/2 w-1/2 object-contain"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-col">
        <h4 className="font-poppins text-2xl font-semibold">{project.name}</h4>
        <p className="mt-2 text-slate-500">{project.description}</p>
        <div className="mt-5 flex items-center gap-2 font-poppins">
          <Link
            to={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-600"
          >
            Live Link
          </Link>
          <img src={arrow} alt="arrow" className="h-4 w-4 object-contain" />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
