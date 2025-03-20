export default function SkillsSection() {
    const skills = ["React", "Node.js", "Tailwind", "JavaScript", "Material UI", "HTML", "CSS", "Redux"];
  
    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Skills</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {skills.map((skill) => (
            <span key={skill} className="bg-gray-200 px-3 py-1 rounded-md text-sm">{skill}</span>
          ))}
        </div>
      </div>
    );
  }
  