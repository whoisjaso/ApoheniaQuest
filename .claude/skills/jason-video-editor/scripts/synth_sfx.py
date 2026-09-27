import numpy as np, wave
SR=44100; rng=np.random.default_rng(7)
def save(n,x,g=0.9):
    x=np.asarray(x,dtype=np.float64); x=x/ (np.max(np.abs(x))+1e-9)*g
    st=np.stack([x,x],1) if x.ndim==1 else x
    with wave.open(f"public/sfx/{n}.wav","wb") as w:
        w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((st*32767).astype(np.int16).tobytes())
def t(d): return np.arange(int(SR*d))/SR
def env(n,a,r): e=np.ones(n); ai=int(a*SR); e[:ai]=np.linspace(0,1,ai) if ai else 1; e*=np.exp(-np.arange(n)/(r*SR)); return e
def lp(x,a): # one-pole lowpass, a in (0,1) per-sample or scalar
    y=np.zeros_like(x); p=0; a=np.broadcast_to(a,x.shape)
    for i in range(len(x)): p+=a[i]*(x[i]-p); y[i]=p
    return y
def bp_noise(d,f0,f1):
    n=rng.standard_normal(int(SR*d)); f=np.geomspace(f0,f1,len(n)); a=1-np.exp(-2*np.pi*f/SR)
    return lp(n,a)-lp(lp(n,a*0.5),a*0.5)*0.5
# whoosh
d=0.45; x=bp_noise(d,300,5000); e=np.sin(np.pi*np.linspace(0,1,len(x)))**2; save("whoosh",x*e,0.6)
# swish reverse (riser) 
d=0.9; x=bp_noise(d,200,8000)*np.linspace(0,1,int(SR*d))**3; save("riser",x,0.5)
# pop
tt=t(0.12); f=900*np.exp(-tt*40)+300; x=np.sin(2*np.pi*np.cumsum(f)/SR)*env(len(tt),0.002,0.03); save("pop",x,0.7)
# click
tt=t(0.03); x=rng.standard_normal(len(tt))*env(len(tt),0,0.004); save("click",x,0.5)
# boom (sub drop)
tt=t(1.4); f=110*np.exp(-tt*3)+38; x=np.sin(2*np.pi*np.cumsum(f)/SR)*env(len(tt),0.003,0.45); x+=lp(rng.standard_normal(len(tt)),0.05)*env(len(tt),0,0.05)*0.6; x=np.tanh(x*2.5); save("boom",x,0.95)
# tape stop (slow-mo) : downward saw sweep
tt=t(0.8); f=420*np.exp(-tt*3.2)+30; ph=np.cumsum(f)/SR; x=(2*(ph%1)-1)*0.5+np.sin(2*np.pi*ph*0.5); x=lp(x,0.15)*np.linspace(1,0.2,len(tt)); save("tapestop",x,0.6)
# ka-ching
tt=t(0.9); x=np.zeros(len(tt))
for st,fr in [(0,2093),(0.07,2637),(0.07,3136)]:
    i=int(st*SR); s=t(0.9-st); x[i:]+=np.sin(2*np.pi*fr*s)*env(len(s),0.001,0.25)+0.3*np.sin(2*np.pi*fr*2.01*s)*env(len(s),0,0.1)
n=int(0.06*SR); x[:n]+=rng.standard_normal(n)*env(n,0,0.02)*2; save("kaching",x,0.55)
# glitch
tt=t(0.35); x=np.sign(np.sin(2*np.pi*np.repeat(rng.uniform(80,1500,14),len(tt)//14+1)[:len(tt)]*tt))*(rng.random(len(tt))>0.3)
x=np.round(x*4)/4*env(len(tt),0,0.2); save("glitch",x,0.35)
# record scratch
tt=t(0.5); f=np.abs(np.sin(2*np.pi*3*tt))*900+100; x=lp(rng.standard_normal(len(tt)),0.3)*0.5+np.sin(2*np.pi*np.cumsum(f)/SR)*0.6; x*=env(len(tt),0.01,0.25); save("scratch",x,0.6)
# coin (game)
x=np.concatenate([np.sign(np.sin(2*np.pi*988*t(0.07))),np.sign(np.sin(2*np.pi*1319*t(0.35)))*env(int(0.35*SR),0,0.12)]); save("coin",x,0.3)
# stamp / impact
tt=t(0.6); x=np.tanh(3*(np.sin(2*np.pi*(60+120*np.exp(-tt*25))*tt)*env(len(tt),0.001,0.18)+lp(rng.standard_normal(len(tt)),0.4)*env(len(tt),0,0.03))); save("impact",x,0.9)
# typing ticks
tt=t(0.6); x=np.zeros(len(tt))
for k in range(9):
    i=int((k*0.065+rng.uniform(0,0.02))*SR); n=int(0.02*SR); x[i:i+n]+=rng.standard_normal(n)*env(n,0,0.003)
save("typing",x,0.35)
# ding (notification)
tt=t(0.8); x=np.sin(2*np.pi*1760*tt)*env(len(tt),0.002,0.2)+0.5*np.sin(2*np.pi*2637*tt)*env(len(tt),0.002,0.12); save("ding",x,0.4)
# BUZZER wrong
tt=t(0.45); x=np.sign(np.sin(2*np.pi*110*tt))+np.sign(np.sin(2*np.pi*116*tt)); x=lp(x,0.2)*env(len(tt),0.005,0.3); save("buzzer",x,0.45)
# ---- music bed: dark trap 140bpm, ~36s
BPM=140; beat=60/BPM; L=36; N=int(L*SR); m=np.zeros((N,)); 
def add(sig,at):
    i=int(at*SR); j=min(N,i+len(sig)); m[i:j]+=sig[:j-i]
kick=np.sin(2*np.pi*np.cumsum(50+120*np.exp(-t(0.5)*30))/SR)*env(int(0.5*SR),0.002,0.18)
hat=lp(rng.standard_normal(int(0.05*SR)),0.9)*env(int(0.05*SR),0,0.01); hat=hat-lp(hat,0.3)
snare=(lp(rng.standard_normal(int(0.3*SR)),0.5)*0.8+np.sin(2*np.pi*190*t(0.3))*0.5)*env(int(0.3*SR),0.001,0.07)
root=[43.65,43.65,38.89,41.2]  # F1 F1 D#1 E1-ish
bars=int(L/(beat*4))+1
for b in range(bars):
    b0=b*beat*4
    for k in [0,1.5,2.75]: add(kick*0.9,b0+k*beat)
    add(snare*0.55,b0+1*beat); add(snare*0.55,b0+3*beat)
    for h in range(8): add(hat*(0.25 if h%2 else 0.35),b0+h*beat/2)
    if b%2==1:
        for r in range(4): add(hat*0.22,b0+3.5*beat+r*beat/8)
    f=root[b%4]; s=t(beat*4); bass=np.tanh(2*np.sin(2*np.pi*f*s))*env(len(s),0.01,1.2)*0.7; add(bass,b0)
    # pad: minor chord detuned
    s=t(beat*4); pad=sum(np.sin(2*np.pi*f*mult*(1+dt)*s) for mult in [4,4*1.1892,4*1.4983] for dt in [-0.003,0.003])
    pad*=np.sin(np.pi*np.linspace(0,1,len(s)))*0.06; add(pad,b0)
m=np.tanh(m*1.2); save("beat",m,0.8)
print("ok")
