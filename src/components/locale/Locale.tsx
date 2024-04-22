import React, { useState } from "react";
import { PlayerLocaleType } from "../../@types/player.model";
import { useLocale } from "../../hooks/useLocale";

const Locale = ({ localeKey }: { localeKey: keyof PlayerLocaleType }) => {
  const { locale } = useLocale({
    onChangeLocale(locale) {
      setLoc(locale[localeKey]);
    },
  });

  const [loc, setLoc] = useState<string | undefined>(locale[localeKey]);

  return <div>{loc}</div>;
};

export default Locale;
