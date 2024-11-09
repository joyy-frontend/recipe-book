export default function Formcomponent({ elements, onSubmit }) {
    return (
        <form className="base-form" onSubmit={onSubmit}>
            {elements.inputs.map((input, idx) => {
                return (
                    <div className="input-container" key={idx}>
                        <i className={`fa ${input.icon}`}></i>  {/* 아이콘 추가 */}
                        <input
                            type={input.type}
                            className="custom-input"
                            name={input.name}
                            placeholder={input.placeholder}
                            value={input.value}
                            onChange={(e) => input.changeFunc(e.target.name, e.target.value)}
                        />
                    </div>
                );
            })}
            {elements.buttons.map((btn, idx) => {
                return (
                    <div className="button-container" key={idx}>  
                        <button
                            type={btn.type}
                            name={btn.name}
                            className="base-btn btn-outline-primary">
                            {btn.label}
                        </button>
                    </div>
                );
            })}
        </form>
    );
}