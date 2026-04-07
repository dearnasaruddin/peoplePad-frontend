import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"

const ItemsPerPageSelect = ({limit, onChange}) => {
    return (
        <div>
            <NativeSelect value={limit} onChange={onChange} className='text-gray-300 border-gray-500'>
                <NativeSelectOption value={5}>05 Show</NativeSelectOption>
                <NativeSelectOption value={10}>10 Show</NativeSelectOption>
                <NativeSelectOption value={15}>15 Show</NativeSelectOption>
                <NativeSelectOption value={20}>20 Show</NativeSelectOption>
            </NativeSelect>
        </div>
    )
}

export default ItemsPerPageSelect