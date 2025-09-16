"use client";

export default function Share({ title }: { title: string }) {
  return (
    <div className="flex w-full">
      <button
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(
              `${title} - 규연.데브\n\n${window.location.href}`
            );

            // 토스트 메시지 엘리먼트 생성
            const toast = document.createElement("div");
            toast.className =
              "fixed bottom-[-100px] right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg transition-all duration-300";
            toast.textContent = "URL을 클립보드에 복사하였습니다.";

            // 토스트를 추가한 직후 애니메이션을 위해 약간의 지연
            setTimeout(() => {
              toast.style.bottom = "1rem";
            }, 100);

            // 토스트 메시지를 body에 추가
            document.body.appendChild(toast);

            // 3초 후 토스트 메시지 제거
            setTimeout(() => {
              toast.style.opacity = "0";
              setTimeout(() => {
                document.body.removeChild(toast);
              }, 300);
            }, 3000);
          } catch (err) {
            console.error("클립보드 복사 중 오류가 발생했습니다:", err);
            alert(
              "클립보드 복사에 실패했습니다. 브라우저 권한을 확인해주세요."
            );
          }
        }}
        className="bg-primary flex items-center gap-2 justify-center border-background border-2 text-primary-foreground w-full py-3 rounded-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
          />
        </svg>
        이 게시글 공유하기
      </button>
    </div>
  );
}
