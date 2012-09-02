/**
 * asm-brush
 * http://www.chlankboot.com/blog/asm-brush
 *
 * @version
 * 1.0.1 (December 15, 2010)
 *
 * @copyright
 * Copyleft 2010 chlankboot
 *
 * @license
 * Free
 *
 * Modified by wsmithril@gmail.com on 2012-09-02
 *   adjust for SynatexHighlighter verion 3+
 *   add 64-bit registers
 *
 */

;(function() {
    typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

    function Brush() {
        var registers = "ah al ax bh bl bp bx ch cl cr0 cr2 cr3 cr4 cs cx dh di dl dr0 dr1 dr2 dr3 dr6 dr7 ds dx eax ebp ebx ecx edi"
                      + " edx es esi esp fs gs si sp ss st tr3 tr4 tr5 tr6 tr7 st0 st1 st2 st3 st4 st5 st6 st7 mm0 mm1 mm2 mm3 mm4 mm5 mm6 mm7"
                      + " xmm0 xmm1 xmm2 xmm3 xmm4 xmm5 xmm6 xmm7"
                      + " rax rbx rcx rdx rbp rdi rsi rsp";

        var usr_inst = "aaa aad aam aas adc add and bsf bsr bswap bt btc btr bts"
                     + " call cbw cdq clc cld cmc cmova cmovae cmovb cmovbe cmovc cmove cmovg cmovge cmovl cmovle cmovna cmovnae cmovnb"
                     + " cmovnbe cmovnc cmovne cmovng cmovnge cmovnl cmovnle cmovno cmovnp cmovns cmovnz cmovo cmovp cmovpe cmovpo cmovs"
                     + " cmovz cmp cmps cmpsb cmpsd cmpsw cmpxchg cmpxchg8b cpuid cwd cwde daa das dec div enter idiv imul inc ja jae jb jbe"
                     + " jc jcxz je jecxz jg jge jl jle jmp jna jnae jnb jnbe jnc jne jng jnge jnl jnle jno jnp jns jnz jo jp jpe jpo js jz"
                     + " lahf lea leave lods lodsb lodsd lodsw loop loopd loope looped loopew loopne loopned loopnew loopnz loopnzd loopnzw"
                     + " loopw loopz loopzd loopzw mov movs movsb movsd movsw movsx movzx mul neg nop not or pop popa popad popf popfd push"
                     + " pusha pushad pushd pushf pushfd pushw rcl rcr rep repe repne repnz repz ret retf retn rol ror sahf sal sar sbb scas"
                     + " scasb scasd scasw seta setae setb setbe setc sete setg setge setl setle setna setnae setnb setnbe setnc setne setng"
                     + " setnge setnl setnle setno setnp setns setnz seto setp setpe setpo sets setz shl shld shr shrd stc std stos stosb"
                     + " stosd stosw sub test ud2 xadd xchg xlat xlatb xor";

        var sys_inst = "arpl bound cli clts hlt in ins insb insd insw int into invd invlpg iret iretd iretdf iretf lar"
                     + " lds les lfs lgdt lgs lidt lldt lmsw lock lsl lss ltr out outs outsb outsd outsw rdmsr rdpmc rdtsc rsm sgdt sidt"
                     + " sldt smsw sti str sysenter sysexit verr verw wbinvd wrmsr";

        var fpu_inst = "f2xm1 fabs fadd faddp fbld fbstp fchs fclex fcmovb fcmovbe fcmove fcmovnb fcmovnbe fcmovne"
                     + " fcmovnu fcmovu fcom fcomi fcomip fcomp fcompp fcos fdecstp fdiv fdivp fdivr fdivrp ffree fiadd ficom ficomp"
                     + " fidiv fidivr fild fimul fincstp finit fist fistp fisub fisubr fld fld1 fldcw fldenv fldenvd fldenvw fldl2e"
                     + " fldl2t fldlg2 fldln2 fldpi fldz fmul fmulp fnclex fninit fnop fnsave fnsaved fnsavew fnstcw fnstenv fnstenvd"
                     + " fnstenvw fnstsw fpatan fprem fprem1 fptan frndint frstor frstord frstorw fsave fsaved fsavew fscale fsin"
                     + " fsincos fsqrt fst fstcw fstenv fstenvd fstenvw fstp fstsw fsub fsubp fsubr fsubrp ftst fucom fucomi fucomip"
                     + " fucomp fucompp fwait fxam fxch fxtract fyl2x fyl2xp1 wait esc feni fneni fdisi fndisi fsetpm";

        var mul_inst = "addpd addps addsd addss andnpd andnps andpd andps clflush cmpeqps cmpeqss cmpleps cmpless"
                     + " cmpltps cmpltss cmpneqps cmpneqss cmpnleps cmpnless cmpnltps cmpnltss cmpordps cmpordss cmppd cmpps cmpsd"
                     + " cmpss cmpunordps cmpunordss comisd comiss cvtdq2pd cvtdq2ps cvtpd2dq cvtpd2pi cvtpd2ps cvtpi2pd cvtpi2ps"
                     + " cvtps2dq cvtps2pd cvtps2pi cvtsd2si cvtsd2ss cvtsi2sd cvtsi2ss cvtss2sd cvtss2si cvttpd2dq cvttpd2pi"
                     + " cvttps2dq cvttps2pi cvttsd2si cvttss2si divpd divps divsd divss emms femms fxrstor fxsave ldmxcsr lfence"
                     + " maskmovdqu maskmovq maxpd maxps maxsd maxss mfence minpd minps minsd minss movapd movaps movd movdq2q movdqa"
                     + " movdqu movhlps movhpd movhps movlhps movlpd movlps movmskpd movmskps movntdq movnti movntpd movntps movntq"
                     + " movq movq2dq movsd movss movupd movups mulpd mulps mulsd mulss orpd orps packssdw packsswb packuswb paddb"
                     + " paddd paddq paddsb paddsw paddusb paddusw paddw pand pandn pause pavgb pavgusb pavgw pcmpeqb pcmpeqd pcmpeqw"
                     + " pcmpgtb pcmpgtd pcmpgtw pextrw pf2fw pf2id pf2iw pfacc pfadd pfcmpeq pfcmpge pfcmpgt pfmax pfmin pfmul"
                     + " pfnacc pfpnacc pfrcp pfrcpit1 pfrcpit2 pfrsqit1 pfrsqrt pfsub pfsubr pi2fd pinsrw pmaddwd pmaxsw pmaxub"
                     + " pminsw pminub pmovmskb pmulhrw pmulhuw pmulhw pmullw pmuludq por prefetch prefetchnta prefetcht0 prefetcht1"
                     + " prefetcht2 prefetchw psadbw pshufd pshufhw pshuflw pshufw pslld pslldq psllq psllw psrad psraw psrld psrldq"
                     + " psrlq psrlw psubb psubd psubq psubsb psubsw psubusb psubusw psubw pswapd punpckhbw punpckhdq punpckhqdq"
                     + " punpckhwd punpcklbw punpckldq punpcklqdq punpcklwd pxor rcpps rcpss rsqrtps rsqrtss sfence shufpd shufps"
                     + " sqrtpd sqrtps sqrtsd sqrtss stmxcsr subpd subps subsd subss ucomisd ucomiss unpckhpd unpckhps unpcklpd"
                     + " unpcklps xorpd xorps cmpeqpd cmpltpd cmplepd cmpunordpd cmpneqpd cmpnltpd cmpnlepd cmpordpd cmpeqsd cmpltsd"
                     + " cmplesd cmpunordsd cmpneqsd cmpnltsd cmpnlesd cmpordsd pavgusb pfadd pfsub pfsubr pfacc pfcmpge pfcmpgt"
                     + " pfcmpeq pfmin pfmax pi2fd pf2id pfrcp pfrsqrt pfmul pfrcpit1 pfrsqit1 pfrcpit2 pmulhrw femms prefetch"
                     + " prefetchw pf2iw pfnacc pfpnacc pf2fw pswapd fisttp lddqu addsubps addsubpd haddpd hsubps haddpd hsubpd"
                     + " movshdup movsldup monitor mwait";

        var masm_specific = "\\.186 \\.286 \\.286c \\.286p \\.287 .386 \\.386c"
                          + " \\.386p \\.387 \\.486 \\.486p \\.8086 \\.8087 \\.alpha \\.break \\.code"
                          + " \\.const \\.continue \\.cref \\.data \\.data\\? \\.dosseg \\.else \\.elseif"
                          + " \\.endif \\.endw \\.err \\.err1 \\.err2 \\.errb \\.errdef \\.errdif \\.errdifi"
                          + " \\.erre \\.erridn \\.erridni \\.errnb \\.errndef \\.errnz \\.exit \\.fardata"
                          + " \\.fardata\\? \\.if \\.lall \\.lfcond \\.list \\.listall \\.listif \\.listmacro"
                          + " \\.listmacroall \\.model \\.no87 \\.nocref \\.nolist \\.nolistif \\.nolistmacro"
                          + " \\.radix \\.repeat \\.sall \\.seq \\.sfcond \\.stack \\.startup \\.tfcond"
                          + " \\.type \\.until \\.untilcxz \\.while \\.xall \\.xcref \\.xlist alias align"
                          + " assume catstr comm comment db dd df dosseg dq dt dup dw echo else elseif"
                          + " elseif1 elseif2 elseifb elseifdef elseifdif elseifdifi elseife elseifidn"
                          + " elseifidni elseifnb elseifndef end endif endm endp ends eq equ even exitm"
                          + " extern externdef extrn for forc ge goto group [^&]gt high highword if if1 if2"
                          + " ifb ifdef ifdif ifdifi ife ifidn ifidni ifnb ifndef include includelib instr"
                          + " invoke irp irpc label le length lengthof local low lowword lroffset [^&]lt"
                          + " macro mask mod \\.msfloat name ne offset opattr option org %out page popcontext"
                          + " proc proto ptr public purge pushcontext record repeat rept seg segment short"
                          + " size sizeof sizestr struc struct substr subtitle subttl textequ this title type"
                          + " typedef union while width resb resw resd resq rest incbin equ times %define"
                          + " %idefine %xdefine %xidefine %undef %assign %iassign %strlen %substr %macro"
                          + " %imacro %endmacro %rotate \\.nolist %if %elif %else %endif %ifdef %ifndef"
                          + " %elifdef %elifndef %ifmacro %ifnmacro %elifmacro %elifnmacro %ifctk %ifnctk"
                          + " %elifctk %elifnctk %ifidn %ifnidn %elifidn %elifnidn %ifidni %ifnidni %elifidni"
                          + " %elifnidni %ifid %ifnid %elifid %elifnid %ifstr %ifnstr %elifstr %elifnstr"
                          + " %ifnum %ifnnum %elifnum %elifnnum %error %rep %endrep %exitrep %include %push"
                          + " %pop %repl struct endstruc istruc at iend align alignb %arg %stacksize %local"
                          + " %line bits use16 use32 section absolute extern global common cpu org section"
                          + " group import export \\$ \\? @b @f addr basic byte c carry\\? dword far far16"
                          + " fortran fword near near16 overflow\\? parity\\? pascal qword real4 real8 real10"
                          + " sbyte sdword sign\\? stdcall sword syscall tbyte vararg word zero\\? flat"
                          + " near32 far32 abs all assumes at casemap common compact cpu dotname emulator"
                          + " epilogue error export expr16 expr32 farstack flat forceframe huge language"
                          + " large listing ljmp loadds m510 medium memory nearstack nodotname noemulator"
                          + " nokeyword noljmp nom510 none nonunique nooldmacros nooldstructs noreadonly"
                          + " noscoped nosignextend nothing notpublic oldmacros oldstructs os_dos para"
                          + " private prologue radix readonly req scoped setif2 smallstack tiny use16 use32"
                          + " uses # nasm directives, mostly complete, does not parse properly a16 a32 o16"
                          + " o32 byte word dword nosplit \\$ \\$\\$ seq wrt flat large small \\.text \\.data"
                          + " \\.bss near far %0 %1 %2 %3 %4 %5 %6 %7 %8 %9";

        this.regexList=[
            {regex: /^;.*$/gm,                                          css:"comments"},
            {regex:/\s\;.*$/gm,                                         css:"comments"},
            {regex:/db|dd|df/gm,                                        css:"masm_spc"},
            {regex:/\b[0-9a-fA-F]+\b/gm,                                css:"numbers"},
            {regex:/\b[0-9a-fA-F]+h$\b/gm,                              css:"numbers"},
            {regex:/\bloc_[0-9a-fA-F]+\b/gm,                            css:"labels"},
            {regex:/\bsub_[0-9a-fA-F]+\b/gm,                            css:"labels"},
            {regex:/@[_a-zA-Z-]+./gm,                                   css:"labels"},
            {regex:/.inc|.lib/gm,                                       css:"plain"},
            {regex:/\.[0-9_a-zA-Z-?]+/gm,                               css:"masm_spc"},
            {regex:SyntaxHighlighter.regexLib.doubleQuotedString,       css:"asmstring"},
            {regex:SyntaxHighlighter.regexLib.singleQuotedString,       css:"asmstring"},
            {regex:new RegExp(this.getKeywords(registers), "gmi"),      css:"color1"},
            {regex:new RegExp(this.getKeywords(usr_inst), "gmi"),       css:"keyword"},
            {regex:new RegExp(this.getKeywords(sys_inst), "gmi"),       css:"keyword"},
            {regex:new RegExp(this.getKeywords(fpu_inst), "gmi"),       css:"keyword"},
            {regex:new RegExp(this.getKeywords(mul_inst), "gmi"),       css:"keyword"}
            //{regex:new RegExp(this.getKeywords(masm_specific), "gmi"),  css:"masm_spc"}
        ];
        this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
    };

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases   = ['asm', 'Asm', 'x86'];

    SyntaxHighlighter.brushes.Asm = Brush;
    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();

