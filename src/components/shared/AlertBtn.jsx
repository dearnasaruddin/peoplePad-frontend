import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const AlertBtn = ({ children, alertHeading = 'Are you absolutely sure?', alertText = 'This action cannot be undone. This will permanently delete your account and remove your data from our servers.', mainBtn = 'Delete', mainBtnOnClick, data }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent className={'data-[size=default]:sm:max-w-sm p-4 bg-gray-800 top-4/9 border-gray-500'}>
                <AlertDialogHeader>
                    <AlertDialogTitle className={'text-gray-100'}>{alertHeading}</AlertDialogTitle>
                    <AlertDialogDescription className={'text-gray-300'}>
                        {alertText}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className={'bg-gray-600  text-gray-200 border-none'}>Cancel</AlertDialogCancel>
                    {data ?
                        <AlertDialogAction onClick={() => mainBtnOnClick(data)} className={'bg-red-700'}>{mainBtn}</AlertDialogAction>
                        :
                        <AlertDialogAction onClick={mainBtnOnClick} className={'bg-red-700'}>{mainBtn}</AlertDialogAction>
                    }
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertBtn