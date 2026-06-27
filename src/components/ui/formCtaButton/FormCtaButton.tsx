import './FormCtaButton.css'

interface FormCtaButtonProps {
    onClick: () => void
    label?: string
    disabled?: boolean
    icon?: React.ReactNode
}

export default function FormCtaButton({
    onClick,
    label = 'Submit',
    disabled = false,
    icon,
}: FormCtaButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="form-cta-button"
        >
            <span className="btn-label">{label}</span>
            {icon && <span className="btn-icon">{icon}</span>}
        </button>
    )
}