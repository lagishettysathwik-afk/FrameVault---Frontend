import React from 'react';
import './LanguageFilter.css';

const LanguageFilter = ({ languages, activeLanguage, onLanguageSelect }) => {
  return (
    <div className="language-filter">
      <button
        className={`language-btn ${activeLanguage === 'All' ? 'active' : ''}`}
        onClick={() => onLanguageSelect('All')}
      >
        All
      </button>
      {languages.map((lang) => (
        <button
          key={lang}
          className={`language-btn ${activeLanguage === lang ? 'active' : ''}`}
          onClick={() => onLanguageSelect(lang)}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};

export default LanguageFilter;