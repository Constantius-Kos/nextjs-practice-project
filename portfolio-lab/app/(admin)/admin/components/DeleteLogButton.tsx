'use client'
interface IDeleteLogButtonProps {
    disabled: boolean
    isAdmin: boolean
    onDelete: () => void
}

function DeleteLogButton({ disabled, isAdmin, onDelete }: IDeleteLogButtonProps) {

    return (
        <>
            <button disabled={disabled || !isAdmin} className="hidden lg:flex disabled:text-gray-400  disabled:hover:cursor-not-allowed hover:cursor-pointer hover:text-red-600 hover:text-glow " onClick={() => onDelete()}>
                {disabled ? '[WAIT]' : '[DELETE]'}
            </button>
            <button disabled={disabled || !isAdmin} className="flex lg:hidden disabled:text-gray-400  disabled:hover:cursor-not-allowed hover:cursor-pointer hover:text-red-600 hover:text-glow " onClick={() => onDelete()}>
                {(disabled || !isAdmin) ? '*' : '🗑️'}
            </button>
        </>
    )
}

export default DeleteLogButton
