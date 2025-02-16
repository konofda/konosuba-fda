
export function BackgroundPattern_Legacy() {
    return (
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url("./img/dot.png")',
          backgroundSize: '40px',
          backgroundRepeat: 'repeat',
          opacity: '0.04',
          animation: 'slidePattern 10s linear infinite',
          zIndex: 0,
        }}
      />
    );
  }
  