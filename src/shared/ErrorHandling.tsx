export const Loading = () => {
    return (
        <div className="flex justify-center items-center">
          <p>Loading...</p>
          <div className="loader"></div>
        </div>
      );
}
export const Error = ({ error }: { error?: { message: string } }) => {
    return (
      <div className="flex justify-center items-center">
        <p className="text-red-500">
          {error?.message || "Failed to load vehicles. Please try again later."}
        </p>
      </div>
    );
  };
  