interface LogoProps {
  className?: string;
  title?: string;
}

const Logo = ({ className, title: title = 'LabGraph' }: LogoProps) => {
  return (
    <div className='flex flex-col items-center'>
      <svg
        className={`w-44 h-44 md:w-72 md:h-72 lg:w-72 lg:h-72 ${className}`}
        viewBox='0 0 300 150'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g fill='var(--color-text-primary)'>
          <g
            id='svg_33'
            transform='translate(0 -5) translate(0.871867 10.5649) matrix(0.014087 0 0 -0.0135062 -1.7931 191.985)'
          >
            <path
              d='m16727,14163c-10,-9 -9,-6921 1,-6927c13,-8 54,39 322,359c134,160 249,304 257,322c11,27 13,554 11,3140l-3,3108l-291,3c-160,1 -293,-1 -297,-5z'
              id='svg_34'
            />
            <path
              d='m18016,14148c-3,-13 -6,-1381 -6,-3040c0,-2581 2,-3018 14,-3018c13,0 483,550 554,649c38,53 39,65 8,189c-77,305 -74,562 9,860l35,126l0,1650c0,1453 -10,2515 -25,2584l-5,22l-289,0l-289,0l-6,-22z'
              id='svg_35'
            />
            <path
              d='m4906,13974c-15,-14 -16,-342 -16,-3465c0,-2875 2,-3450 13,-3455c8,-3 63,15 123,40c116,47 256,88 368,107c41,7 76,19 87,30c19,19 19,106 19,3367c0,2089 -4,3353 -10,3362c-11,18 -134,27 -392,29c-148,1 -179,-2 -192,-15z'
              id='svg_36'
            />
            <path
              d='m10866,13964c-15,-14 -16,-432 -16,-4454c0,-3183 3,-4441 11,-4446c13,-8 42,23 337,358c125,142 235,272 245,290c16,31 17,247 17,4135c0,3715 -1,4103 -16,4117c-13,14 -54,16 -289,16c-235,0 -276,-2 -289,-16z'
              id='svg_37'
            />
            <path
              d='m13256,13604c-14,-14 -16,-253 -16,-2480c0,-2117 2,-2465 14,-2470c8,-3 50,10 93,29c111,48 252,93 367,117c55,11 108,28 118,37c17,15 18,111 18,2384c0,2139 -2,2369 -16,2383c-13,14 -54,16 -289,16c-235,0 -276,-2 -289,-16z'
              id='svg_38'
            />
            <path
              d='m7286,12874c-15,-14 -16,-371 -16,-3776c0,-3335 2,-3764 15,-3792c20,-43 570,-590 584,-582c8,5 11,1143 11,4071c0,3681 -1,4065 -16,4079c-13,14 -54,16 -289,16c-235,0 -276,-2 -289,-16z'
              id='svg_39'
            />
            <path
              d='m3702,12677c-11,-13 -13,-732 -12,-3834c0,-2410 4,-3821 10,-3827c13,-13 313,285 335,331c14,29 15,49 6,146c-12,127 -3,266 29,430c29,148 63,244 148,417l77,155l3,3076c2,2617 0,3078 -12,3094c-13,18 -33,19 -293,23c-243,4 -280,2 -291,-11z'
              id='svg_40'
            />
            <path
              d='m12056,12384c-15,-14 -16,-300 -16,-2995c0,-2571 2,-2979 14,-2979c26,0 363,382 375,426c5,19 3,63 -5,119c-22,148 -27,283 -14,395c24,224 66,370 169,585l66,140l3,2147c2,1944 1,2148 -14,2162c-13,14 -53,16 -289,16c-235,0 -276,-2 -289,-16z'
              id='svg_41'
            />
            <path
              d='m9676,12284c-15,-14 -16,-417 -16,-4284c0,-2572 4,-4271 9,-4274c5,-4 23,5 39,19c45,37 513,570 539,613l23,37l0,3937c0,3565 -1,3938 -16,3952c-13,14 -54,16 -289,16c-235,0 -276,-2 -289,-16z'
              id='svg_42'
            />
            <path
              d='m6096,12194c-14,-14 -16,-255 -16,-2508l0,-2493l23,-20c12,-11 56,-33 97,-48c115,-43 264,-120 372,-192c54,-35 102,-62 108,-58c7,4 10,832 10,2655c0,2394 -2,2650 -16,2664c-13,14 -54,16 -289,16c-235,0 -276,-2 -289,-16z'
              id='svg_43'
            />
            <path
              d='m14446,11814c-14,-14 -16,-165 -16,-1509c0,-1407 1,-1494 18,-1513c9,-12 66,-39 126,-62c126,-47 245,-108 363,-186c46,-31 87,-52 93,-49c7,4 10,563 10,1655c0,1485 -2,1650 -16,1664c-13,14 -54,16 -289,16c-235,0 -276,-2 -289,-16z'
              id='svg_44'
            />
            <path
              d='m8486,10994c-15,-14 -16,-340 -16,-3436c0,-3059 2,-3423 15,-3452c9,-18 105,-121 214,-229l198,-197l45,0c57,0 106,17 118,40c7,12 10,1296 10,3639c0,3277 -1,3621 -16,3635c-13,14 -53,16 -284,16c-231,0 -271,-2 -284,-16z'
              id='svg_45'
            />
            <path
              d='m2510,10860c-13,-8 -15,-413 -18,-3526c-2,-2451 0,-3520 8,-3528c13,-13 572,542 595,590c13,28 15,397 15,3237c0,2901 -1,3207 -16,3221c-13,14 -54,16 -292,16c-157,0 -283,-4 -292,-10z'
              id='svg_46'
            />
            <path
              d='m20015,10534c-206,-36 -413,-144 -560,-291c-115,-115 -209,-276 -262,-448c-25,-84 -27,-102 -27,-280c-1,-217 9,-272 89,-466c70,-169 61,-217 -72,-381c-208,-256 -1966,-2344 -2022,-2402c-69,-72 -144,-116 -196,-116c-17,0 -80,12 -140,26c-232,53 -437,42 -665,-36c-141,-49 -195,-52 -262,-12c-26,15 -211,186 -412,381c-418,404 -423,411 -413,529c3,37 13,103 21,147c20,102 20,269 1,376c-57,326 -262,599 -560,744c-180,88 -236,100 -460,100c-227,0 -296,-15 -470,-100c-199,-97 -361,-255 -459,-445c-128,-252 -150,-520 -67,-820c40,-142 23,-216 -76,-330c-26,-30 -713,-808 -1526,-1728c-1126,-1274 -1492,-1681 -1533,-1709c-77,-51 -126,-53 -279,-13c-219,58 -415,53 -638,-16c-130,-39 -190,-43 -250,-13c-52,26 -2006,1973 -2044,2037c-43,72 -44,101 -16,251c22,120 25,154 20,286c-5,162 -23,248 -78,381c-95,228 -320,448 -555,543c-286,115 -592,103 -869,-33c-307,-151 -509,-428 -560,-766c-19,-122 -19,-211 1,-330c8,-52 18,-127 21,-165c5,-64 3,-76 -22,-125c-23,-45 -226,-254 -1080,-1115c-579,-583 -1219,-1230 -1424,-1437c-395,-400 -429,-428 -515,-428c-23,0 -77,9 -121,19c-337,81 -628,35 -890,-142c-185,-125 -346,-346 -404,-557c-34,-125 -71,-290 -71,-321c0,-56 71,-324 108,-409c121,-273 351,-478 642,-573c123,-40 202,-50 360,-45c175,6 268,30 435,113c207,102 357,252 460,460c83,166 108,272 108,465c1,143 -2,165 -32,289c-19,74 -34,151 -34,172c0,88 -13,74 1193,1289c630,635 1253,1264 1384,1397c130,133 262,258 291,278c76,52 118,55 247,16c161,-49 233,-61 365,-61c130,0 215,13 357,54c106,31 146,32 206,5c66,-29 2039,-2002 2075,-2073c29,-59 32,-110 10,-223c-81,-416 66,-816 393,-1064c91,-69 246,-143 367,-176c89,-23 118,-26 265,-26c146,0 176,3 262,26c302,80 538,269 673,537c119,236 142,462 79,761c-28,134 -28,136 -10,182c25,65 77,133 267,347c90,102 214,241 275,310c60,69 337,382 614,695c277,314 673,761 880,995c1174,1329 1103,1251 1179,1290c52,26 95,25 235,-5c204,-44 389,-34 617,34c57,17 114,31 129,31c68,0 129,-49 445,-354c418,-404 459,-447 485,-501c20,-41 22,-56 16,-133c-24,-330 -18,-430 31,-587c93,-294 302,-520 596,-646c214,-91 499,-102 727,-29c215,70 418,219 539,398c60,89 127,233 153,332c20,74 23,108 23,270c0,169 -3,194 -28,287c-34,128 -35,188 -3,252c29,57 59,93 621,762c242,288 566,675 720,859c937,1118 901,1077 983,1119c38,19 58,21 269,21c212,0 235,2 322,25c190,51 336,137 476,280c106,108 184,228 233,358c41,109 82,284 82,349c0,98 -72,382 -123,483c-70,142 -199,295 -321,385c-222,162 -527,232 -801,184z'
              id='svg_47'
            />
            <path
              d='m15636,9984c-15,-14 -16,-160 -14,-1520l3,-1504l170,-170c94,-94 187,-182 208,-197c37,-26 39,-26 107,-14c38,7 81,22 95,33l25,19l0,1669c0,1504 -2,1670 -16,1684c-13,14 -54,16 -289,16c-236,0 -276,-2 -289,-16z'
              id='svg_48'
            />
          </g>
        </g>
      </svg>
      <div className='flex items-center flex-col'>
        <h1 className='text-3xl sm:text-4xl md:text-4xl font-bold text-textPrimary opacity-90'>
          <em>
            {'<'}
            {title}
            {'>'}
          </em>
          <p className='text-sm text-textPrimary md:text-lg opacity-90 inline-flex align-top'>®</p>
        </h1>
        <h2 className='text-lg md:text-sm text-textPrimary opacity-70 mb-4'>
          Making quality management easy
        </h2>
      </div>
    </div>
  );
};

export default Logo;
