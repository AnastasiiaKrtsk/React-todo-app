type ModalProp = {
  children: React.ReactNode;
};

export const Modal = ({ children }: ModalProp) => {
  return (
    // Overlay (dark background)
    //'inset-1'(top/right/bottom/left = 0) and 'fixed' are doing the job
    <div className="fixed inset-1 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-xl bg-panel p-6 shadow-xl">
        {children}
      </div>
    </div>
  );
};

//w-full - Responsive width
//max-w-lg - Maximum width
