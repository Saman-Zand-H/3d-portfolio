import { Skill } from '../types';

type SkillProps = {
  skill: Skill;
};

const SkillCard = (props: SkillProps) => {
  const { imageUrl, name } = props.skill;

  return (
    <div className="block-container h-20 w-20">
      <div className="btn-back rounded-xl" />
      <div className="btn-front flex items-center justify-center rounded-xl">
        <img
          src={imageUrl}
          alt={name}
          className="h-1/2 w-1/2 object-contain"
          title={name}
        />
      </div>
    </div>
  );
};

export default SkillCard;
