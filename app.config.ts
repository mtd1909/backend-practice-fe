export default defineAppConfig({
  ui: {
    button: {
      base: "backdrop-blur-[2px] h-10 flex items-center font-semibold duration-200",
      size: {
        xs: "w-7 h-7 p-0",
        sm: "text-sm",
        md: "text-sm",
        lg: "text-sm !px-6 h-8",
        xl: "!text-sm !px-3.5 h-10",
      },
      color: {
        gray: {
          solid: "bg-gray-500 hover:bg-gray-600 ring-0 text-white",
        },
        primary: {
          solid: "bg-[#4EAC6DE6] hover:bg-primary ring-0 text-white",
        },
        dark: {
          solid: "bg-gray-900 hover:bg-gray-800 ring-0 text-white"
        },
        white: {
          solid: "bg-white hover:opacity-80 ring-0 text-secondary"
        }
      },
    },
    formGroup: {
      label: {
        base: "text-[#787878]",
      },
      container: "mt-2",
      default: {
        size: "lg",
      },
      error: "text-xs pl-3.5",
    },
    input: {
      rounded: "rounded-1.5",
      base: "w-full h-10",
      color: {
        gray: {
          outline:
            "bg-background-100 border border-solid border-transparent ring-0 focus:ring-0 text-secondary-400",
        },
      },
    },
    select: {
      rounded: "rounded-lg",
      default: {
        size: "lg",
      },
    },
    notifications: {
      wrapper: 'z-[1001] notification-custom !w-96'
    },
    inputMenu: {
      rounded: "rounded-1.5",
      background: "bg-[#F8FAFC]",
      option: {
        color: "text-lightGray-600",
        active: "bg-blueRibbon-100",
      },
    },
    selectMenu: {
      rounded: "rounded-1.5",
      background: "bg-gray-800",
      base: "bg-gray-800",
      ring: "ring-0",
      option: {
        color: "text-lightGray-600",
        active: "bg-blueRibbon-100",
        icon: {
          base: "flex-shrink-0 h-5 w-5",
          active: "text-gray-900 dark:text-white",
          inactive: "text-gray-400 dark:text-gray-500",
        },
        selectedIcon: {
          wrapper: "absolute inset-y-0 end-0 flex items-center",
          padding: "pe-2",
          base: "h-5 w-5 text-blueRibbon flex-shrink-0",
        },
      },
      default: {
        selectedIcon: "i-heroicons-check-20-solid",
      },
    },
    pagination: {
      default: {
        size: "xs",
      },
      wrapper: "space-x-2",
      rounded: "rounded-lg",
      base: "ring-0 shadow-none px-3",
    },
    alert: {
      color: {
        warning: {
          solid: "text-[#EA580C] bg-[#FFEDD5]",
        },
        error: {
          solid: "text-[#DC2626] bg-[#FEE2E5]",
        },
      },
    },
    table: {
      wrapper: "relative overflow-x-auto",
      base: "min-w-full table-fixed border-separate border-spacing-y-4",
      divide: "",
      thead: "relative border-none",
      tbody: "",
      caption: "sr-only",
      tr: {
        base: "bg-[rgba(15,23,42,0.48)]",
        selected: "",
        expanded: "bg-black dark:bg-gray-800/50",
        active: "",
      },
      th: {
        base: "text-left rtl:text-right",
        padding: "px-4 py-0",
        color: "text-gray-400",
        font: "font-semibold",
        size: "text-sm",
      },
      td: {
        base: "whitespace-nowrap",
        padding: "px-4 py-4",
        color: "text-white",
        font: "",
        size: "text-sm",
      },
      checkbox: {
        padding: "ps-4",
        checked: "bg-blue-500",
      },
      loadingState: {
        wrapper:
          "flex flex-col items-center justify-center flex-1 px-6 py-14 sm:px-14",
        label: "text-sm text-center text-gray-900 dark:text-white",
        icon: "w-6 h-6 mx-auto text-gray-400 dark:text-gray-500 mb-4 animate-spin",
      },
      emptyState: {
        wrapper:
          "flex flex-col items-center justify-center flex-1 px-6 py-14 sm:px-14",
        label: "text-sm text-center text-gray-900 dark:text-white",
        icon: "w-6 h-6 mx-auto text-gray-400 dark:text-gray-500 mb-4",
      },
      expand: {
        icon: "transform transition-transform duration-200 text-blue-500",
      },
      progress: {
        wrapper: "absolute inset-x-0 -bottom-[0.5px] p-0",
      },
    },
    modal: {
      wrapper: 'relative z-[101]',
      container: 'flex min-h-full items-center sm:items-center justify-center text-center',
      overlay: {
        base: 'fixed inset-0 transition-opacity backdrop-blur-[2.5px]',
        background: 'bg-[rgba(0,0,0,0.5)]',
        transition: {
          enter: 'ease-out duration-300',
          enterFrom: 'opacity-0',
          enterTo: 'opacity-100',
          leave: 'ease-in duration-200',
          leaveFrom: 'opacity-100',
          leaveTo: 'opacity-0'
        }
      },
      background: 'bg-gray-950',
      base: 'relative backdrop-blur-[2px] border border-solid border-gray-800',
      width: 'max-w-full w-full sm:!max-w-150 sm:!w-[600px]'
    },
    checkbox: {
      inner: 'ms-2 flex flex-col',
      label: 'font-normal text-gray-900'
    },
  },
});
