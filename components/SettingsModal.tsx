import languages from "@/data/languages.json";

export default function SettingsModal({
  isOpen,
  onSave,
  onClose,
  language,
  setLanguage,
  nameType,
  setNameType,
}: {
  isOpen: boolean;
  onSave: (language: string, nameType: "official" | "common") => void;
  onClose: () => void;
  language: string;
  setLanguage: (language: string) => void;
  nameType: "official" | "common";
  setNameType: (nameType: "official" | "common") => void;
}) {
  const handleSave = () => {
    localStorage.setItem("quiz_language", language);
    localStorage.setItem("quiz_nameType", nameType);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute flex h-full w-full items-center justify-center bg-black/50">
      <div className="flex flex-col items-start justify-center gap-10 rounded-md bg-gray-800 p-8">
        <h2 className="text-2xl font-bold">Configurações</h2>
        <section className="flex flex-col gap-4">
          <div className="relative">
            <h3>Exibição das alternativas</h3>
            <hr className="absolute w-full" />
          </div>
          <ul className="flex flex-col gap-2">
            <ConfigurationItem label="Idioma">
              <Select
                className="min-w-[160px]"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setLanguage(e.target.value)
                }
                value={language}
                options={languages.map((language) => ({
                  label: language.name,
                  value: language.code,
                }))}
              />
            </ConfigurationItem>
            <ConfigurationItem label="Tipo do nome">
              <Select
                className="min-w-[160px]"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setNameType(e.target.value as "official" | "common")
                }
                value={nameType}
                options={[
                  { label: "Oficial", value: "official" },
                  { label: "Comum", value: "common" },
                ]}
              />
            </ConfigurationItem>
          </ul>
        </section>
        <div className="flex w-full items-center justify-center gap-4">
          <button
            onClick={onClose}
            className="cursor-pointer rounded bg-gray-500 p-2 hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onSave(language, nameType);
              handleSave();
            }}
            className="cursor-pointer rounded bg-blue-500 p-2 hover:bg-blue-600"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfigurationItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center justify-between gap-4">
      {label}
      {children}
    </li>
  );
}

function Select({
  options,
  className,
  onChange,
  value,
}: {
  options: {
    label: string;
    value: string;
  }[];
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  value?: string;
}) {
  return (
    <select
      className={`rounded bg-gray-700 p-2 text-white ${className || ""}`}
      onChange={onChange}
      value={value}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
