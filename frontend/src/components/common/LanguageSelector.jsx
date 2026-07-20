import { useLanguage } from "../../context/LanguageContext";

function LanguageSelector() {

    const {
        language,
        setLanguage,
        languages,
    } = useLanguage();

    return (

        <select
            value={language}
            onChange={(e) =>
                setLanguage(e.target.value)
            }
            className="border rounded-lg px-4 py-2"
        >

            {Object.entries(languages).map(
                ([key, value]) => (

                    <option
                        key={key}
                        value={key}
                    >

                        {value.label}

                    </option>

                )
            )}

        </select>

    );
}

export default LanguageSelector;