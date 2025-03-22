import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

interface IProps{
    backURL: string;
    loading: boolean;
    submitBtnLabel: string;
}
const FormBtn = ({backURL, loading, submitBtnLabel}: IProps) => {
  return (
    <div className="flex justify-end gap-3 pt-4">
    <Link href={backURL}>
        <Button type="button" variant="outline">
            Cancel
        </Button>
    </Link>
    <Button type="submit" disabled={loading}>
        {loading ? "Loading..." : submitBtnLabel}
    </Button>
    </div>
  )
}

export default FormBtn