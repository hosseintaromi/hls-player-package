import styled from "@emotion/styled";

export const FadeBackDrop = styled.div(({ theme }) => ({
    position: 'fixed',
    background: '#ff000000',
    inset: 0,
    width: '100vw',
    height: '100vh',
}));

export const OverlayContainer = styled.div(({ theme }) => ({
    backgroundColor: theme.settingBg,
    color: theme.settingTextColor,
    width: '300px',
    borderRadius: '15px',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
    position: 'absolute',
    bottom: '50px',
    right: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

export const SettingHeaderWrapper = styled.div(({ theme }) => ({
    cursor: "pointer",
    'svg': {
        transform: 'rotate(180deg)',
        marginRight: "10px",
        marginLeft: "15px",
    }
}));

export const SettingHeaderTitle = styled.div(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    borderBottom: `1px solid ${theme.iconColor}33`,
    lineHeight: "inherit",
    fontSize: "14px",
    color: theme.iconColor,
    paddingRight: "15px",
    height: "40px",
    whiteSpace: "nowrap",
}));

export const SettingMenuItem = styled.div(({ theme }) => ({
    display: 'flex',
    justifyContent: "space-between",
    alignItems: "center",
    cursor: 'pointer',
    height: "40px",
    position: "relative",
    lineHeight: 1,
    '&:hover': {
        backgroundColor: theme.settingBgHover,
    },
    '&.dialog-item:hover': {
        backgroundColor: "transparent"
    },
    '&.active': {
        color: theme.settingTitleTextColor
    },
    '&.is-reversed': {
        justifyContent: 'flex-start',
        '.reserved-span': {
            paddingLeft: 0,
            paddingRight: "60px",
        },
        '.reversed-icon': {
            right: '1rem',
            left: 'auto',
            padding: 0,
        }
    }
}));

export const SettingItemArrowSpan = styled.span({
    paddingRight: '10px'
});

export const SettingItemSpan = styled.div(({ theme }) => ({
    fontSize: theme.settingFontSize,
    paddingLeft: "41px",
}));

export const SettingItemIcon = styled.div({
    paddingRight: "15px",
    paddingLeft: "10px",
    width: "16px",
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
});

export const SettingItemMore = styled.div(({ theme }) => ({
    paddingRight: "10px",
    paddingLeft: "15px",
    fontSize: theme.settingFontSize
}));

export const SettingItemWrapper = styled.span({});