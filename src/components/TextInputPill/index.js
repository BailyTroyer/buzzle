import React from 'react';

import '../../tailwind.generated.scss';

const TextInputPill = (props) => {
  const { label, type, name, onChange, onBlur, value } = props;

  return (
    <div className="flex flex-col justify-center">
      <form className="flex flex-col">
        <label className="font-semibold text-xs text-gray-700">{label}</label>
        <input className="outline-none border-none bg-greyish rounded-md text-lg py-2 px-4 mb-4" type={type} name={name} onChange={onChange} onBlur={onBlur} value={value} />
      </form>
    </div>
  );
};

export default TextInputPill;