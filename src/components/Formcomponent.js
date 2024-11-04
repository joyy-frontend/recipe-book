export default function Formcomponent({ elements, onSubmit }) {
    return (
        <form onSubmit={onSubmit}>
            {elements.inputs.map((input, idx) => {
                return (
                    <div className="form-floating mb-3" key={idx}>
                        <input
                        type={input.type}
                        className="form-control"
                        name={input.name}
                        placeholder={input.placeholder}
                        value={input.value}
                        onChange={(e) => input.changeFunc(e.target.name, e.target.value)}
                        />
                        <label htmlFor={input.name}>{input.placeholder}</label>
                    </div>
                );
            })}
            {elements.buttons.map((btn, idx) => {
                return (
                    <button
                    key={idx}
                    type={btn.type}
                    name={btn.name}
                    className="btn btn-outline-primary m-1">
                    {btn.label}
                    </button>
                );
            })}
        </form>
    );
}